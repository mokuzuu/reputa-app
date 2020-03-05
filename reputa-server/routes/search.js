let express = require('express');
let router = express.Router();
const axios = require('axios');
const api = require('../api');
const querystring = require('querystring');
const redis = require('redis');
const AWS = require('aws-sdk');
let Sentiment = require('sentiment');
let sentiment = new Sentiment();

// create and connect redis client to local instance.
const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err);
});

/* Search for tweets based on keywords. */
router.get('/', function(req, res, next) {
    let keyword = req.query.query;

    const storeKey = `reputa-${keyword}`;

    // S3 params
    const params = { Bucket: api.bucketName, Key: storeKey};

    // Search in redis/s3 to see if there are any pre-searched keywords
    return client.get(storeKey, (err, result) => {
        // If that key exist in Redis store
        if (result) {
            const resultJSON = JSON.parse(result);
            console.log("redis");
            return res.status(200).json(resultJSON);
        } else {
            // if key does not exist in Redis store, check s3
            return new AWS.S3({apiVersion: '2006-03-01'}).getObject(params, (err, result) => {
                if (result) {
                    // Serve from S3
                    console.log("s3");
                    const resultJSON = JSON.parse(result.Body);
                    // Save the Wikipedia API response in Redis store
                    client.setex(storeKey, 3600, JSON.stringify({source: 'Redis Cache', data: resultJSON.data,}));
                    return res.status(200).json(resultJSON);
                } else {
                    // if key does not exist in s3 either, execute search
                    getToken().then((response) => {
                        if (response.status === 200) {
                            return response.data.access_token;
                        }
                    }).then((token) => {
                        searchTweets(keyword, token).then((response) => {
                            if (response.status === 200) {
                                return extractData(response.data.statuses);
                            }
                        }).then((tweets) => {
                            // analyse tweets
                            let analysed = analyse(tweets);
                            persist(analysed, storeKey);
                            return res.status(200).json({ source: 'Twitter API', data: analysed, });
                        })
                    })
                }
            });
        }
    });
});

// Get access token for Twitter API
let getToken = () => {
    return new Promise((resolve) => {
        resolve(
            axios.post(api.twitterTokenUrl, querystring.stringify({
                grant_type: "client_credentials"
            }), {
                headers: {
                    "Authorization": `Basic ${api.twitterBasic}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }).then((response) => {
                return response;
            }).catch((err) => {
                return err;
            }))
    });
};

// Search for tweets based on a keyword
let searchTweets = (keyword, token) => {
    return new Promise((resolve) => {
        resolve(
            axios.get(`${api.twitterSearchUrl}?q="${keyword}"&lang=en&count=100`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then((response) => {
                return response;
            }).catch((err) => {
                return err;
            })
        )
    })
};

// Extract tweet_id and text from Array of tweets
let extractData = (data) => {
    return data.map(d => ({
        id: d.id,
        text: d.text
    }));
};

// Apply sentiment analysis
let analyse = (tweets) => {
    let positive_count = 0;
    let negative_count = 0;
    let neutral_count = 0;
    let analysed_tweets = tweets.map((tweet) => {
        let result = sentiment.analyze(tweet.text);
        if (result.score > 0) {
            positive_count += 1;
        } else if (result.score < 0) {
            negative_count += 1;
        } else {
            neutral_count += 1;
        }
        return {
            id: tweet.id,
            text: tweet.text,
            score: result.score,
            positive_words: result.positive,
            negative_words: result.negative,
            positive: result.score > 0
        }
    });
    return {
        positive_rate: positive_count / tweets.length,
        negative_rate: negative_count / tweets.length,
        neutral_rate: neutral_count / tweets.length,
        tweets: analysed_tweets
    }
};

// store data in redis and s3
let persist = (data, key) => {
    const responseJSON = data;
    const body = JSON.stringify({ source: 'S3 Bucket', data: responseJSON});
    const objectParams = {Bucket: api.bucketName, Key: key, Body: body};
    const uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(function(data) {
        console.log("Successfully uploaded data to " + api.bucketName + "/" + key);
    });

    // Save the response data in Redis store. Auto-expires after 3600 secs.
    console.log("twitter api");
    client.setex(key, 3600, JSON.stringify({ source: 'Redis Cache', data: responseJSON, }));
};

module.exports = router;

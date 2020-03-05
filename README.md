# REPUTA
Reputa is the web application for getting the public reaction of tweets include the specific term you provide.

## How to use
This repositiry exists as my portfolio work, so you can see how I develop this software. Do not hesitate to ask any questions related to this work and myself.

Currently, you are able to see source codes for backend however you cannot actually run on your device. Backend application runs on my cloud therefore the application is executable. 

To run the frontend, you need to clone the application and

```
cd reputa-app/reputa-client
yarn
yarn start
```

## Usage
You can type any keyword in the search bar to get the reaction of tweets include the keyword. 

Dashboard looks like this.
![dashboard](https://github.com/mokuzuu/reputa-app/docs/reputa-1.png)

As mentioned above, the search bar is where an user is able to provide any keyword to search.

Let's say an user typed a keyword "corona" and run a search.

![search_result](https://github.com/mokuzuu/reputa-app/docs/reputa-2.png)

You can see on the graph right, red part is percentage of  words with positive impression used in all filtered tweets, blue part is percentage of words negative impression, and grey part is neutral impression.

![tweets](https://github.com/mokuzuu/reputa-app/docs/reputa-3.png)
The app displays first twenty tweets included in the process. words in blue color means negative, in red means positive and in grey means neutral.





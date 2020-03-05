import { API_URL } from "api/info";
const search = (word: string) => {
  return new Promise((resolve, reject) => {
    const searchParams = new URLSearchParams();
    searchParams.set("query", word);
    fetch(API_URL + "/search?" + searchParams.toString())
      .then(res => res.json())
      .then(result => {
        console.log(result);
        resolve(result.data);
      })
      .catch(err => reject(err));
  });
};

export default {
  search
};

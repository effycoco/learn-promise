const wordnikAPI =
  "https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI =
  "https://api.giphy.com/v1/gifs/search?rating=PG&api_key=dc6zaTOxFJmzC&q=";
function setup() {
  noCanvas();
  wordGif()
    .then((results) => {
      createP(results.word);
      createImg(results.img);
    })
    .catch((err) => console.error(err));
}
// async await 函数返回的是一个promise,
// 如果该 promise fulfilled，then里面的回调函数就会接受returned object作为参数
async function wordGif() {
  // async await 版本
  let response = await fetch(wordnikAPI);
  let json = await response.json();
  let gifResponse = await fetch(giphyAPI + json.word);
  let gifJson = await gifResponse.json();
  let img_url = gifJson.data[0].images["fixed_height_small"].url;
  return {
    word: json.word,
    img: img_url,
  };
  // 初始版本
  // fetch(wordnikAPI)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     createP(json.word);
  //     return fetch(giphyAPI + json.word);
  //   })
  //   .then((response) => response.json())
  //   .then((json) => createImg(json.data[0].images["fixed_height_small"].url))
  //   .catch((err) => console.error(err));
}

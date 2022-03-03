const wordnikAPI =
  "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI = `https://api.giphy.com/v1/gifs/search?rating=PG&api_key=KyLqWb732Bw6y9WRNkgQz6usBeUtYH1d&q=`;
function setup() {
  noCanvas();
  // promise.all
  // 存在的问题：如果任何一个promise没成功，则那些成功的也不会在页面显示，如何解决？ try-catch
  // 使用try-catch, 我们自己在wordGif内部处理单个promise不成功的状况，而不是统一交给Promise.all().catch()处理
  let promises = [];
  for (let i = 2; i < 10; i++) {
    promises.push(wordGif(5));
  }

  Promise.all(promises)
    .then((results) => {
      for (let result of results) {
        createP(result.word);
        if (result.img) {
          createImg(result.img);
        }
      }
    })
    .catch((err) => console.error(err));
}

async function wordGif(num) {
  let response = await fetch(wordnikAPI + `&minLength=${num}&maxLength=${num}`); // 单词长度
  let json = await response.json();
  let gifResponse = await fetch(giphyAPI + json.word);
  let gifJson = await gifResponse.json();
  let img_url = null;
  try {
    img_url = gifJson.data[0].images["fixed_height_small"].url;
  } catch (e) {
    console.log("No image found for " + json.word);
    console.error(e);
  } finally {
    return {
      word: json.word,
      img: img_url,
    };
  }
}

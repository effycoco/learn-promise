const wordnikAPI =
  "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI =
  "https://api.giphy.com/v1/gifs/search?rating=PG&api_key=KyLqWb732Bw6y9WRNkgQz6usBeUtYH1d&q=";
function setup() {
  noCanvas();
  // promise.all版本, 保证顺序且代码更简洁
  // 仍存在的问题：如果任何一个promise没成功，则那些成功的也不会在页面显示，如何解决？ try-catch
  let promises = [wordGif(4), wordGif(5), wordGif(6)];
  Promise.all(promises)
    .then((results) => {
      for (let result of results) {
        createP(result.word);
        createImg(result.img);
      }
    })
    .catch((err) => console.error(err));
  // 链式方法版本，保证顺序但代码重复多
  // wordGif(3)
  //   .then((results) => {
  //     createP(results.word);
  //     createImg(results.img);
  //     return wordGif(4);
  //   })
  //   .then((results) => {
  //     createP(results.word);
  //     createImg(results.img);
  //   })
  //   .catch((err) => console.error(err));

  // 平行版本：顺序没有保证
  // wordGif(3)
  //   .then((results) => {
  //     createP(results.word);
  //     createImg(results.img);
  //   })
  //   .catch((err) => console.error(err));
  // wordGif(4)
  //   .then((results) => {
  //     createP(results.word);
  //     createImg(results.img);
  //   })
  //   .catch((err) => console.error(err));
}
// 如果几个异步函数平行而不是chain，那它们先后完成的顺序没有保证，在页面出现的前后位置也不确定。
// 解决方法 1. 使用链式方法 2. 使用promise.all:等待所有异步函数都完成后再处理返回的数据

async function wordGif(num) {
  let response = await fetch(wordnikAPI + `&minLength=${num}&maxLength=${num}`);
  let json = await response.json();
  let gifResponse = await fetch(giphyAPI + json.word);
  let gifJson = await gifResponse.json();
  let img_url = gifJson.data[0].images["fixed_height_small"].url;
  return {
    word: json.word,
    img: img_url,
  };
}

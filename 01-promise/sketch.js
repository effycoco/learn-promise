const wordnikAPI =
  "https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=-1&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI =
  "https://api.giphy.com/v1/gifs/search?rating=PG&api_key=dc6zaTOxFJmzC&q=";
function setup() {
  noCanvas();
  fetch(wordnikAPI)
    .then((response) => response.json())
    .then((json) => {
      createP(json.word);
      return fetch(giphyAPI + json.word);
    })
    .then((response) => response.json())
    .then((json) => createImg(json.data[0].images["fixed_height_small"].url))
    .catch((err) => console.log(err));
  // fetch 返回的是一个promise object, 具有then和catch方法，各自接受一个callback，分别在promise fulfilled 和 reject时调用
  // fetch 返回 promise that resolves to the response to that request
  // response对象自身需要通过json()解析，才能返回能为我们所用的数据；
  // json()返回的也是一个promise, that resolves to 解析 Response 得到的 json 数据
  // 如果要连用then, 在then里面的callback里必需return，当然如果只有一句，箭头函数里的return可以省略，但如果是两句要记得加上
  // 最后一个catch会catch整个过程中任何地方遇到的 err, 即多个then只需要一个 catch
  // 之所以能🔗是因为第一个至倒数第二个then都返回了新的promise对象，下一个then是这个新promise的方法
}

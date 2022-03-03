function setup() {
  noCanvas();
  // fulfill
  delayES8(1000)
    .then(() => createP("hello"))
    .catch((err) => console.error(err));
  //  reject
  delayES8("promising")
    .then(() => createP("hello"))
    .catch((err) => console.error(err));
}
async function delayES8(time) {
  await delay(time); // return a promise
}
// await means wait for promise being resolved

function delay(time) {
  function dealWithPromise(resolve, reject) {
    if (isNaN(time)) reject(new Error("delay requires a valid number"));
    else setTimeout(resolve, time);
  }
  return new Promise(dealWithPromise); // 改写后是最常见的形式
}
// delay返回的是一个promise对象，
// resolve将promise状态从pending变为fulfilled,
// 状态改变后then里面的函数被调用
// reject将promise状态从pending变为rejected
// 状态改变后catch里面的函数被调用

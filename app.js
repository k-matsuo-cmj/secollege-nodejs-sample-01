// expressをappとして利用可能にする
const express = require("express");
const app = express();
// ポート3000番で待ち受け
const server = app.listen(3000, function() {
  console.log("start http://localhost:3000/");
});

app.get("/", function(req, res, next){
  res.send('こんにちは！！');
});
app.get("/test", function(req, res, next){
  res.send('テストです！');
});
// expressをappとして利用可能にする
const express = require("express");
const app = express();
// ポート3000番で待ち受け
const server = app.listen(3000, function () {
  console.log("start http://localhost:3000/");
});

app.get("/", function (req, res, next) {
  res.send('こんにちは！！');
});

// 名前リスト
const nameList = [
  { id: "1", name: "山田", address: "東京都" },
  { id: "2", name: "鈴木", address: "千葉県" }
];
// 名前リストを取得するAPI
app.get("/api/names/list", function (req, res, next){
  res.json(nameList);
});
// 名前リストを個別取得
app.get("/api/names/:nameId", function (req, res, next) {
  let name;
  for (let i = 0; i < nameList.length; i++) {
    if (nameList[i].id == req.params.nameId) {
      name = nameList[i];
      break;
    }
  }
  res.json(name);
});
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

// 名前リストを取得するAPI
app.get("/api/names/list", function (req, res, next) {
  // データベースから取得
  const connection = getMySQLConnection();
  // 接続
  connection.connect((err) => {
    if (err) {
      console.log(`error connecting: ${err.stack}`);
      return;
    }
    console.log('success');
  });
  // クエリの発行
  connection.query(
    'SELECT * FROM names', (error, results) => {
      res.json(results); // エラー処理割愛
    }
  );
});
// 名前リストを個別取得
app.get("/api/names/:nameId", function (req, res, next) {
  // データベースから取得
  const connection = getMySQLConnection();
  // 接続
  connection.connect((err) => {
    if (err) {
      console.log(`error connecting: ${err.stack}`);
      return;
    }
    console.log('success');
  });
  // クエリの発行
  connection.query(
    'SELECT * FROM names WHERE id = ?', [req.params.nameId], (error, results) => {
      res.json(results); // エラー処理割愛
    }
  );
});

// データベースコネクション取得
function getMySQLConnection() {
  const mysql = require("mysql");
  return mysql.createConnection({
    host: 'localhost',
    user: 'seplus',
    password: 'seplus',
    database: 'node_sample'
  });
}

// view engineにejsを指定する
app.set('view engine', 'ejs');
// hello.ejsを表示
app.get('/hello', function (req, res, next) {
  res.render('hello', { name: '田中' });
});

// apiでなく、画面でリストを作成する
app.get('/names', function (req, res, next) {
  // データベースから取得
  const connection = getMySQLConnection();
  // 接続
  connection.connect((err) => {
    if (err) {
      console.log(`error connecting: ${err.stack}`);
      return;
    }
    console.log('success');
  });
  // クエリの発行
  connection.query(
    'SELECT * FROM names', (error, results) => {
      res.render('names', { names: results });
    }
  );
});
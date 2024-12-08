// ボタンを格納
const high = document.querySelector( '#High' );
const low = document.querySelector( '#Low' );
// クラブの1~13
const club = [  "images/card_club_01.webp",
  "images/card_club_02.webp",
  "images/card_club_03.webp",
  "images/card_club_04.webp",
  "images/card_club_05.webp",
  "images/card_club_06.webp",
  "images/card_club_07.webp",
  "images/card_club_08.webp",
  "images/card_club_09.webp",
  "images/card_club_10.webp",
  "images/card_club_11.webp",
  "images/card_club_12.webp",
  "images/card_club_13.webp"];
  // ダイアの1~13
  const diamond = [
    "images/card_diamond_01.webp",
    "images/card_diamond_02.webp",
    "images/card_diamond_03.webp",
    "images/card_diamond_04.webp",
    "images/card_diamond_05.webp",
    "images/card_diamond_06.webp",
    "images/card_diamond_07.webp",
    "images/card_diamond_08.webp",
    "images/card_diamond_09.webp",
    "images/card_diamond_10.webp",
    "images/card_diamond_11.webp",
    "images/card_diamond_12.webp",
    "images/card_diamond_13.webp"
  ];
  // スペードの1~13
  const spade = [
    "images/card_spade_01.webp",
    "images/card_spade_02.webp",
    "images/card_spade_03.webp",
    "images/card_spade_04.webp",
    "images/card_spade_05.webp",
    "images/card_spade_06.webp",
    "images/card_spade_07.webp",
    "images/card_spade_08.webp",
    "images/card_spade_09.webp",
    "images/card_spade_10.webp",
    "images/card_spade_11.webp",
    "images/card_spade_12.webp",
    "images/card_spade_13.webp"
  ];
  // ハートの1~13
  const heart = [
    "images/card_heart_01.webp",
    "images/card_heart_02.webp",
    "images/card_heart_03.webp",
    "images/card_heart_04.webp",
    "images/card_heart_05.webp",
    "images/card_heart_06.webp",
    "images/card_heart_07.webp",
    "images/card_heart_08.webp",
    "images/card_heart_09.webp",
    "images/card_heart_10.webp",
    "images/card_heart_11.webp",
    "images/card_heart_12.webp",
    "images/card_heart_13.webp"
  ];

// 4つの絵柄を格納
const cardList = [ club, diamond, spade, heart ];

// カードの裏面を格納
const cardBack = "images/card_back.webp";

// カードの表示場所
const table = document.querySelector('#gametable > div');
// 結果の表示場所
const resultField = document.querySelector('#gametable > p');

// 数字の格納数 代表してclub
const numLength = club.length;
// 絵柄の格納数
const listLength = cardList.length;

/*
必要な乱数
r1 : 1枚目のカードの絵柄 4種類
r2 : 1枚目のカードの数字 13種類
r3 : 2枚目のカードの絵柄 4種類
r4 : 2枚目のカードの数字 13種類
絵柄が一緒かつ数字が一緒　(r1=r3)かつ(r2=r4)の場合は、そうでなくなるまで処理を繰り返す
*/
// 上記条件の乱数を生成する
let r1;
let r2;
let r3;
let r4;
// (r1=r3)かつ(r2=r4)でなくなるまで繰り返す関数
const randomNum = () => {
  while( (r1 === r3) && (r2 === r4)) {
    // 乱数を生成
    r1 = Number(Math.floor(Math.random()* (listLength - 1 ) +1));
    r2 = Number(Math.floor(Math.random()* (numLength - 1 ) +1));
    r3 = Number(Math.floor(Math.random()* (listLength - 1 ) +1));
    r4 = Number(Math.floor(Math.random()* (numLength - 1 ) +1));
  }
};
// 実行しておいて乱数初期値を生成
randomNum();

// 変数をクリア
const resetNum = () => {
    r1 = "";
    r2 = "";
    r3 = "";
    r4 = "";
}

const cardSet = () => {
  // まずテーブルの内容をクリア
  table.innerHTML = '';
  // 新しいカードセットを表示
  table.innerHTML = '<img src="' + cardList[r1][r2] + '" width="204px" height="300px"> <div id="changecard"> <img src="' + cardBack + '" width="204px" height="300px"> </div>';

  // 変更対象のカードを再取得
  const changeCard = document.querySelector( '#changecard' );
  changeCard.addEventListener( 'click', change );
}

// カードを変更する関数
const change = () => {
  // 変更対象のカードを格納
  const changeCard = document.querySelector( '#changecard' );
  changeCard.innerHTML = '<img src=' + cardList[r3][r4] + ' width="204px" height="300px" ></img>';
};
// 関数の実行
cardSet();


// 成功回数表示場所
const nowScore = document.querySelector( '#nowScore' );
// ハイスコア表示場所
const highScoreField = document.querySelector( '#highScore' );
// 成功回数
let successes = 0;
// ハイスコア保管用
let highScore = 0;
// 現在の連続成功回数を表示する関数
const upNowScore = () => {
  nowScore.textContent = successes;
}
// ハイスコア機能
const upHighScore = () => {
  if ( successes > highScore ) {
    highScoreField.textContent = successes;
  }
}

// 条件別に結果を出す用の関数３種類
const winResult = () => {
  nextBtn();
  resultField.textContent = '成功!';
  successes = successes + 1;
  upNowScore();
  upHighScore();
}
const loseResult = () => {
  resetBtn();
  resultField.textContent = '失敗...また挑戦してね！';
}
const drawResult = () => {
  nextBtn();
  resultField.textContent = 'ドロー！もう１度！';
}


const btnWrap = document.querySelector( '#btn-wrap' );

// ボタンを書き換える high/low=>next/reset
const nextBtn = () => {
  btnWrap.innerHTML = '<button class="reset" id="nextGame">次のゲームへ</button>';
  document.querySelector( '#nextGame' ).addEventListener( 'click', restartGame );
}

const resetBtn = () => {
  btnWrap.innerHTML = '<button class="reset" id="resetGame">はじめから</button>';
  document.querySelector( '#resetGame' ).addEventListener( 'click', resetGame );
}

// ボタンを書き換える high/low<=next/reset
const originBtn = () => {
  btnWrap.innerHTML = '<button id="High">High</button><button id="Low">Low</button>';
  document.querySelector( '#High' ).addEventListener( 'click', highClick );
  document.querySelector( '#Low' ).addEventListener( 'click', lowClick );
}

// リスタート;次のゲームへ
const restartGame = () => {
  resultField.textContent = '結果は...';
  resetNum();
  randomNum();
  cardSet();
  originBtn();
}

// リセット;はじめから
const resetGame = () => {
  resultField.textContent = '結果は...';
  successes = 0;
  upNowScore();
  resetNum();
  randomNum();
  cardSet();
  originBtn();
}

// ボタンクリックイベント
const highClick = () => {
  change();
  if ( r4 > r2 ) {
    winResult();
  } else if ( r2 > r4 ) {
    loseResult();
  } else {
    drawResult();
  }
}

const lowClick = () => {
  change();
  if ( r2 > r4 ) {
    winResult();
  } else if ( r4 > r2 ) {
    loseResult();
  } else {
    drawResult();
  }
}

// 初期ボタンにイベントリスナーを追加
high.addEventListener( 'click', highClick );
low.addEventListener( 'click', lowClick );










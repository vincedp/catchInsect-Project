"use-strict";

const notif = document.querySelector(".notif");
const timer = document.querySelector(".time");
const playBtn = document.querySelector(".play-btn");
const body = document.body;
const header = document.querySelector(".header");
const insectBtn = document.querySelector(".insect-buttons");

window.addEventListener("load", (e) => {
  body.classList.remove("move");
  body.classList.remove("move2");
  notif.classList.remove("open");
});

playBtn.addEventListener("click", (e) => {
  body.classList.add("move");
});

// const timer = async function () {
//   const res = await timerCB();
//   return res;
// };

// const timerCB = function () {
//   return new Promise((resolve) => {
//     setInterval(() => {
//       const min = Math.trunc(ctr / 60);
//       const sec = ctr % 60;
//       ctr += 1;
//       if (ctr > 60) {
//         const checker =
//           min < 10 && sec < 10
//             ? `0${min}:0${sec}`
//             : min < 10 && sec >= 10
//             ? `0${min}:${sec}`
//             : min >= 10 && sec < 10
//             ? `${min}:0${sec}`
//             : `${min}:${sec}`;
//         resolve(checker);
//       }
//       resolve(`0${min}:0${sec}`);
//     }, 1000);
//   });
// };

let selectedInsect = {};

insectBtn.addEventListener("click", (e) => {
  const clicked = e.target.closest(".insect");
  if (!clicked) return;
  if (clicked) {
    body.classList.remove("move");
    body.classList.add("move2");
    const img = clicked.querySelector(".img-btn");
    const imgSrc = img.getAttribute("img");

    selectedInsect = {
      imgSrc,
    };

    let ctr = 0;
    setInterval(() => {
      const min = Math.trunc(ctr / 60);
      const sec = ctr % 60;

      const checker =
        min < 10 && sec < 10
          ? `0${min}:0${sec}`
          : min < 10 && sec >= 10
          ? `0${min}:${sec}`
          : min >= 10 && sec < 10
          ? `${min}:0${sec}`
          : `${min}:${sec}`;
      ctr += 1;
      if (ctr > 60) {
        timer.innerHTML = checker;
      }
      timer.innerHTML = checker;
    }, 1000);
    setTimeout(() => notif.classList.add("open"), 2000);
  }
});

// const time = async function (()) {
//   setTimeout();
// };

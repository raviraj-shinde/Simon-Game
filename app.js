let started = false;
let gameseq = [];
let userseq = [];
let boxes = ["box-0", "box-1", "box-2", "box-3"];
let level = 0;
let ele = document.querySelector(".level-show");

/********** FUNCTIONS  *********** */

startKeyPress = () => {
  if (!started) {
    ele.classList.remove("animation-h3");
    started = true;
    levelUp();
  }
};

//Flash Functions
gameFlash = (btn) => {
  btn.classList.add("gameflash");
  setTimeout(() => {
    btn.classList.remove("gameflash");
  }, 170);
};

userFlash = (btn) => {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 170);
};

function levelUp() {
  userseq = [];
  level++;
  ele.innerHTML = `Level ${level}`;

  let randomInd = Math.floor(Math.random() * 4);
  let randomBoxID = boxes[randomInd];
  let randomBox = document.querySelector(`#${randomBoxID}`);
  gameFlash(randomBox);
  gameseq.push(randomBoxID);
  console.log(gameseq); //optional
}

check = (idx) => {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    ele.innerHTML = `<span class="span-go">Game Over</span>,  Press any key to start the game <p> Your Score: ${level}</p>`;
    resetGame();
  }
};

function boxPress() {
  let box = this;
  userFlash(box);

  let boxID = box.getAttribute("id");
  userseq.push(boxID);
  console.log(boxID); //optional

  check(userseq.length - 1);
}

function resetGame() {
  gameseq = [];
  userseq = [];
  started = false;
  level = 0;
  ele.classList.add("animation-h3");

}

/*******************  FUNCTIONS END  ***********************/

document.body.addEventListener("keypress", startKeyPress);
// document.body.addEventListener("click", startKeyPress);

let allBox = document.querySelectorAll(".box");
for (box of allBox) {
  box.addEventListener("click", boxPress);
}

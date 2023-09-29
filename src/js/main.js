"use-strict";

// Selector for screens
const screens = document.querySelectorAll(".header");

// Selector for time and score
const timerEl = document.querySelector(".time");
const scoreEl = document.querySelector(".score");

// Selector for play and choose insects button
const playBtn = document.querySelector(".play-btn");
const insectBtn = document.querySelector(".insect-buttons");

// Selector for notif message
const notifications = document.querySelector(".notif");

// Increment later to update timer and score
let ctr = 0;
let score = 0;

// Store img src string
let selectedInsect = "";

// Clicking "play game" goes to next screen which is choosing insects
// up class name adds -100vh margin top
playBtn.addEventListener("click", () => screens[0].classList.add("up"));

// Clicking on insects or selecting insects
insectBtn.addEventListener("click", (e) => {
  // Ignore clicks within the buttons of the .insect-buttons div element
  const clicked = e.target.closest(".insect");

  // Guard clause to prevent uncaught error when clicking on the .insect-buttons div element
  if (!clicked) return;

  // Go to next screen where you will be catching insects
  // up class name adds -100vh margin top
  screens[1].classList.add("up");

  // Get img src of the selected button
  selectedInsect = clicked.querySelector(".img-btn").getAttribute("src");

  // Function to start the timer and display insect
  startGame();
});

const startGame = () => {
  // Display insect
  createInsect();

  // Start timer
  setInterval(increaseTimer, 1000);
};

const increaseScore = () => {
  // Add score
  ++score;

  // Display notification message when score is greater than 19
  // open class name sets opacity to 1 from 0
  if (score > 19) notifications.classList.add("open");

  // Display score counter to user
  scoreEl.innerHTML = `${score}`;
};

// Function expression since this keyword is needed
const catchInsect = function () {
  // Execute this function whenever an insect is clicked
  increaseScore();

  // caught class name sets the scale of the insect to 0
  this.classList.add("caught");

  // Without setTimeout animation of insect disappearing won't be seen, actually remove insect element after 2s
  setTimeout(() => {
    this.remove();
  }, 2000);

  // Add more insects
  addInsects();
};

const addInsects = () => {
  // Display 2 insects whenever 1 is removed
  createInsect();
  createInsect();
};

// Function to create insects
const createInsect = () => {
  // Destructure data taken from a function that returns random x and y values
  const { x, y } = randomLocation();

  // Create a div element
  const insectEl = document.createElement("div");

  // ins class name sets position property to absolute, key to display insect element in the viewport randomly
  insectEl.classList.add("ins");

  // Set top and left values of insect element, also a key to display insect element in the viewport randomly
  insectEl.style.top = `${y}px`;
  insectEl.style.left = `${x}px`;

  // Append the insect element with an img element with the img src taken from the selectedInsect variable
  // Also add style to generate random insect angles
  insectEl.innerHTML = `<img src="${selectedInsect}" alt="" style="transform: rotate(${Math.ceil(
    Math.random() * 360
  )}deg);">`;

  // Click events on the insect invokes the catchInsect function, remove and add insects at the same time
  insectEl.addEventListener("click", catchInsect);

  // Display the insect el on the last screen
  screens[2].append(insectEl);
};

// Timer function
const increaseTimer = () => {
  // Add 1 second whenever invoked
  ++ctr;

  // Calculate minute and seconds
  const min = Math.trunc(ctr / 60);
  const sec = ctr % 60;

  // Function to display 0 whenever minutes or seconds is less than 10, timer format
  const zeroCheck = (time) => (time < 10 ? `0${time}` : time);

  // Update timer
  timerEl.innerHTML = `${zeroCheck(min)}:${zeroCheck(sec)}`;
};

// Function that randomizes x and y coordinates in the viewport
const randomLocation = () => {
  // Get width and height based on the currently available viewport
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Actual logic to randomize then return the values of x and y
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
};

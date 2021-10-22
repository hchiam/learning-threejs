window.Keys = Object.freeze({
  // key: value (value = opposite of key)
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
  HOME: "HOME",
});
let xSpeed = 10;
let ySpeed = 10;
let lastKeyPress;
let keyPressIntervalTimer;
let keyPressTimeoutTimer;

function setUpKeyEvents({ mesh, speedX, speedY }) {
  // TODO: smoother motion with tweening? or CSS magic? or just continue a sequence of 1-steps after keypress?

  if (speedX) xSpeed = speedX;
  if (speedY) ySpeed = speedY;

  document.addEventListener(
    "keydown",
    (event) => {
      smoothen(() => {
        onDocumentKeyDown(event);
      });
    },
    false
  );
  function onDocumentKeyDown(event) {
    const key = event.code || event.key || event.keyCode || event.which;
    switch (key) {
      case "ArrowLeft":
      case "KeyA":
      case "a":
      case 37:
      case 65:
        goLeft(mesh);
        break;
      case "ArrowRight":
      case "KeyD":
      case "d":
      case 39:
      case 68:
        goRight(mesh);
        break;
      case "ArrowUp":
      case "KeyW":
      case "w":
      case 38:
      case 87:
        goUp(mesh);
        break;
      case "ArrowDown":
      case "KeyS":
      case "s":
      case 40:
      case 83:
        goDown(mesh);
        break;
      case "Space":
      case " ":
      case 32:
        goHome(mesh);
        break;
    }
  }
}

function goLeft(mesh) {
  mesh.position.x -= xSpeed;
  lastKeyPress = Keys.LEFT;
}
function goRight(mesh) {
  mesh.position.x += xSpeed;
  lastKeyPress = Keys.RIGHT;
}
function goUp(mesh) {
  mesh.position.y += ySpeed;
  lastKeyPress = Keys.UP;
}
function goDown(mesh) {
  mesh.position.y -= ySpeed;
  lastKeyPress = Keys.DOWN;
}
function goHome(mesh) {
  mesh.position.set(0, 0, 0);
  lastKeyPress = Keys.HOME;
}

function smoothen(action) {
  clearInterval(keyPressIntervalTimer);
  clearTimeout(keyPressTimeoutTimer);
  keyPressIntervalTimer = setInterval(() => {
    action();
  }, 10);
  keyPressTimeoutTimer = setTimeout(() => {
    clearInterval(keyPressIntervalTimer);
  }, 70);
}

function reverseLastKeyPress(mesh) {
  smoothen(() => {
    switch (lastKeyPress) {
      case Keys.LEFT:
        goRight(mesh);
        break;
      case Keys.RIGHT:
        goLeft(mesh);
        break;
      case Keys.UP:
        goDown(mesh);
        break;
      case Keys.DOWN:
        goUp(mesh);
        break;
    }

    lastKeyPress = null;
  });
}

module.exports = {
  xSpeed,
  ySpeed,
  lastKeyPress,
  keyPressIntervalTimer,
  keyPressTimeoutTimer,
  setUpKeyEvents,
  goLeft,
  goRight,
  goUp,
  goDown,
  goHome,
  smoothen,
  reverseLastKeyPress,
};

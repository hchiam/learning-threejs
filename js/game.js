window.Keys = Object.freeze({
  // key: value (value = opposite of key)
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
  HOME: "HOME",
});

// canvas <- renderer <- scene, camera, mesh
// mesh <- geometry, material
let mesh;
let mesh2;
let mesh3;
let mesh4;
const aspectRatio =
  document.documentElement.clientWidth / document.documentElement.clientHeight;
const camera = new THREE.PerspectiveCamera(100, aspectRatio, 0.1, 10000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
const canvas = document.querySelector("#scene-container");

const xSpeed = 10;
const ySpeed = 10;
let lastKeyPress;
let intervalTimer;
let timeoutTimer;

setUpMesh();
setUpCanvas();

setUpKeyEvents();

function setUpMesh() {
  const myMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("green"),
    emissive: new THREE.Color("green"),
    specular: new THREE.Color("#636363"),
    shininess: 10,
    shading: THREE.FlatShading,
    opacity: 0.75,
  });
  const myMaterial2 = new THREE.MeshPhongMaterial({
    color: new THREE.Color("red"),
    emissive: new THREE.Color("blue"),
    specular: new THREE.Color("#636363"),
    shininess: 10,
    shading: THREE.FlatShading,
    opacity: 0.75,
  });
  const myMaterial3 = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#15366a"),
    emissive: new THREE.Color("#15366a"),
    specular: new THREE.Color("#15366a"),
    shininess: 10,
    shading: THREE.FlatShading,
    opacity: 0.75,
  });

  mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(50, 1), myMaterial);
  mesh.rotation.z = 0.5;
  mesh.position.z = -100;

  mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(50, 1), myMaterial2);
  mesh2.rotation.z = 0.5;
  mesh2.position.x = -100;
  mesh2.position.y = 100;
  mesh2.position.z = -100;

  mesh3 = new THREE.Mesh(new THREE.IcosahedronGeometry(50, 1), myMaterial2);
  mesh3.rotation.z = 0.5;
  mesh3.position.x = 150;
  mesh3.position.y = 150;
  mesh3.position.z = -100;

  mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(50, 1), myMaterial3);
  mesh4.rotation.z = 0.5;
  mesh4.position.x = -150;
  mesh4.position.y = -150;
  mesh4.position.z = -100;
}

function updateMesh() {
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.03;
  mesh2.rotation.x += 0.03;
  mesh2.rotation.y += 0.02;
  mesh3.rotation.x += 0.02;
  mesh3.rotation.y += 0.02;
  mesh4.rotation.x -= 0.02;
  mesh4.rotation.y -= 0.02;
  updatePath();
}

let t = 0;
function updatePath() {
  t++;
  const diffX = Math.round(Math.sin(t / 100) * 50);
  const diffY = Math.round(Math.cos(t / 100) * 50);
  mesh3.position.x = 150 + diffX;
  mesh3.position.y = 150 + diffY;
}

function setUpCanvas() {
  setUpCamera();
  setUpScene();
  setUpRenderer();
  canvas.append(renderer.domElement);
}

function setUpCamera() {
  camera.position.z = 200;
}

function setUpScene() {
  scene.add(camera);

  const light1 = new THREE.PointLight(0xffffff, 1);
  light1.position.z = 100;
  light1.position.y = 100;
  light1.position.x = 100;
  scene.add(light1);

  const light2 = new THREE.PointLight(0xffffff, 0.8);
  light2.position.z = 200;
  light2.position.y = 50;
  light2.position.x = -100;
  scene.add(light2);

  scene.add(mesh);
  scene.add(mesh2);
  scene.add(mesh3);
  scene.add(mesh4);
}

function setUpRenderer() {
  renderer.setSize(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight
  );

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    updateMesh();
    const haveCollision =
      detectCollision(mesh, mesh2) || detectCollision(mesh, mesh3);
    signalCollision(haveCollision);
    if (haveCollision) {
      clearInterval(intervalTimer);
      clearTimeout(timeoutTimer);
      reverseLastKeyPress();
    }
  }

  render();
}

function setUpKeyEvents() {
  // movement - please calibrate these values
  // TODO: smoother motion with tweening? or CSS magic? or just continue a sequence of 1-steps after keypress?

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
        goLeft();

        break;
      case "ArrowRight":
      case "KeyD":
      case "d":
      case 39:
      case 68:
        goRight();
        break;
      case "ArrowUp":
      case "KeyW":
      case "w":
      case 38:
      case 87:
        goUp();
        break;
      case "ArrowDown":
      case "KeyS":
      case "s":
      case 40:
      case 83:
        goDown();
        break;
      case "Space":
      case " ":
      case 32:
        goHome();
        break;
    }
  }
}

function goLeft() {
  mesh.position.x -= xSpeed;
  lastKeyPress = Keys.LEFT;
}
function goRight() {
  mesh.position.x += xSpeed;
  lastKeyPress = Keys.RIGHT;
}
function goUp() {
  mesh.position.y += ySpeed;
  lastKeyPress = Keys.UP;
}
function goDown() {
  mesh.position.y -= ySpeed;
  lastKeyPress = Keys.DOWN;
}
function goHome() {
  mesh.position.set(0, 0, 0);
  lastKeyPress = Keys.HOME;
}

function smoothen(action) {
  clearInterval(intervalTimer);
  clearTimeout(timeoutTimer);
  intervalTimer = setInterval(() => {
    action();
  }, 10);
  timeoutTimer = setTimeout(() => {
    clearInterval(intervalTimer);
  }, 70);
}

function reverseLastKeyPress() {
  switch (lastKeyPress) {
    case Keys.LEFT:
      goRight();
      break;
    case Keys.RIGHT:
      goLeft();
      break;
    case Keys.UP:
      goDown();
      break;
    case Keys.DOWN:
      goUp();
      break;
  }

  lastKeyPress = null;
}

function detectCollision(firstObject, secondObject) {
  const firstBB = new THREE.Box3().setFromObject(firstObject);
  const secondBB = new THREE.Box3().setFromObject(secondObject);
  const hasCollision = firstBB.isIntersectionBox(secondBB);
  return hasCollision;
}

function signalCollision(on = true) {
  if (on) {
    document.body.classList.add("collision-detected");
  } else {
    document.body.classList.remove("collision-detected");
  }
}

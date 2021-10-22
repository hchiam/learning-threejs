/**
 * Creating a car from 3D primitives (instead of using a model built from a 3D editor).
 * With a little bit of drawing textures on cube sides with HTML canvas.
 *
 * References:
 *
 * https://www.freecodecamp.org/news/three-js-tutorial
 *
 * https://codepen.io/HunorMarton/pen/qBqzQOJ
 */

const { setUpKeyEvents } = require("./helpers/keyboardControl.js");

const scene = new THREE.Scene();
const car = createCar();
scene.add(car);
setUpLights(scene);
const camera = createCamera();
setUpRenderer(scene, camera, car);

setUpKeyEvents({ mesh: car, speedX: 5, speedY: 5 });

function setUpLights(scene) {
  const ambientLight = new THREE.AmbientLight("white", 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 0.8);
  directionalLight.position.set(200, 500, 300);
  scene.add(directionalLight);
}

function createCamera() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const cameraWidth = 250;
  const cameraHeight = cameraWidth / aspectRatio;
  const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, // left
    cameraWidth / 2, // right
    cameraHeight / 2, // top
    cameraHeight / -2, // bottom
    0, // near plane
    1000 // far plane
  );
  camera.position.set(70, 70, 200);
  camera.lookAt(0, 10, 0);
  return camera;
}

function setUpRenderer(scene, camera, car) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  renderer.setAnimationLoop(() => {
    // car.rotation.y -= 0.007;
    renderer.render(scene, camera);
  });

  document.body.appendChild(renderer.domElement);
}

function createCar() {
  const car = new THREE.Group();

  const backWheels = createWheelPair();
  backWheels.position.y = 6;
  backWheels.position.x = -18;
  backWheels.rotation.x = Math.PI / 2;
  car.add(backWheels);

  const frontWheels = createWheelPair();
  frontWheels.position.y = 6;
  frontWheels.position.x = 18;
  frontWheels.rotation.x = Math.PI / 2;
  car.add(frontWheels);

  const carBody = createCarBody();
  car.add(carBody);

  const cabin = createCabin();
  car.add(cabin);

  return car;
}

function createWheelPair() {
  const geometry = new THREE.CylinderGeometry(5, 5, 35, 20);
  const material = new THREE.MeshLambertMaterial({ color: "grey" });
  const wheelCylinder = new THREE.Mesh(geometry, material);
  return wheelCylinder;
}

function createCarBody() {
  const carBody = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: "maroon" })
  );
  carBody.position.y = 12;
  return carBody;
}

function createCabin() {
  const carFrontTexture = getCarFrontTexture();
  const carBackTexture = getCarFrontTexture();
  const carRightSideTexture = getCarSideTexture();
  const carLeftSideTexture = getCarSideTexture();

  // adjustments for left side:
  carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
  carLeftSideTexture.rotation = Math.PI;
  carLeftSideTexture.flipY = false;

  const boxFrontBackTopBottomRightLeft = [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }), // front
    new THREE.MeshLambertMaterial({ map: carBackTexture }), // back
    new THREE.MeshLambertMaterial({ color: "white" }), // top
    new THREE.MeshLambertMaterial({ color: "white" }), // bottom
    new THREE.MeshLambertMaterial({ map: carRightSideTexture }), // right
    new THREE.MeshLambertMaterial({ map: carLeftSideTexture }), // left
  ];

  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 12, 24),
    boxFrontBackTopBottomRightLeft
  );
  cabin.position.x = -6;
  cabin.position.y = 25.5;

  return cabin;
}

function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;

  const context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, 64, 32);
  context.fillStyle = "grey";
  context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;

  const context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, 128, 32);
  context.fillStyle = "grey";
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}

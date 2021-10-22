const {
  setUpKeyEvents,
  reverseLastKeyPress,
  keyPressIntervalTimer,
  keyPressTimeoutTimer,
} = require("./helpers/keyboardControl.js");

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

setUpMesh();
setUpCanvas();

setUpKeyEvents(mesh);

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
      clearInterval(keyPressIntervalTimer);
      clearTimeout(keyPressTimeoutTimer);
      reverseLastKeyPress(mesh);
    }
  }

  render();
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

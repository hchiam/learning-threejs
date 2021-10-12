// canvas <- renderer <- scene, camera, mesh
// mesh <- geometry, material
let mesh;
const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 10000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
const canvas = document.querySelector("#scene-container");

setUpMesh();
setUpCanvas();

setUpKeyEvents();

function setUpMesh() {
  const myMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color("red"),
    emissive: new THREE.Color("blue"),
    specular: new THREE.Color("white"),
    shininess: 10,
    shading: THREE.FlatShading,
    opacity: 0.75,
  });

  mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 1), myMaterial);
  mesh.rotation.z = 0.5;
}

function updateMesh() {
  mesh.rotation.x += 0.02;
  mesh.rotation.y += 0.03;
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

  const L1 = new THREE.PointLight(0xffffff, 1);
  L1.position.z = 100;
  L1.position.y = 100;
  L1.position.x = 100;
  scene.add(L1);

  const L2 = new THREE.PointLight(0xffffff, 0.8);
  L2.position.z = 200;
  L2.position.y = 50;
  L2.position.x = -100;
  scene.add(L2);

  scene.add(mesh);
}

function setUpRenderer() {
  renderer.setSize(700, 700);

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    updateMesh();
  }

  render();
}

function setUpKeyEvents() {
  // movement - please calibrate these values
  const xSpeed = 10;
  const ySpeed = 10;

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    const key = event.code || event.key || event.keyCode || event.which;
    switch (key) {
      case "ArrowLeft":
      case "KeyA":
      case "a":
      case 37:
      case 65:
        mesh.position.x -= xSpeed;
        break;
      case "ArrowRight":
      case "KeyD":
      case "d":
      case 39:
      case 68:
        mesh.position.x += xSpeed;
        break;
      case "ArrowUp":
      case "KeyW":
      case "w":
      case 38:
      case 87:
        mesh.position.y += ySpeed;
        break;
      case "ArrowDown":
      case "KeyS":
      case "s":
      case 40:
      case 83:
        mesh.position.y -= ySpeed;
        break;
      case "SpaceBar":
      case " ":
        mesh.position.set(0, 0, 0);
        break;
    }
  }
}

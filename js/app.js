// create three.js scene:
const container = document.querySelector("#scene-container");
const scene = new THREE.Scene();
scene.background = new THREE.Color("skyblue");

// create camera:
const fieldOfView = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane
const camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far);
// every object is initially created at ( 0, 0, 0 )
// we'll move the camera back a bit so that we can view the scene
camera.position.set(0, 0, 10);

// mesh <- geometry and material
const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial(); // default white basic material that doesn't need lighting
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// add renderer to container:
container.appendChild(renderer.domElement);
// render scene and camera:
renderer.render(scene, camera);

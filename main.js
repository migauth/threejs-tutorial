import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

const forestTexture = new THREE.TextureLoader().load("forest.jpg");
scene.background = forestTexture;

const mikeTexture = new THREE.TextureLoader().load("me.jpg");

const mike = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: mikeTexture })
);

const ballTexture = new THREE.TextureLoader().load('painted_brick.jpg');

const ball = new THREE.Mesh(
  new THREE.SphereGeometry( 3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: ballTexture
  })
)

scene.add(mike)
scene.add(ball)

ball.position.z = 30
ball.position.setX(-10);

mike.position.z = 20

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  ball.rotation.x += 0.05;
  ball.rotation.y += 0.075;
  ball.rotation.z += 0.05;

  mike.rotation.y += 0.01;
  mike.rotation.z += 0.01;

  camera.position.z = 20 + t * -0.05;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;

}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate);

  // Optionally, add rotation for animation effect
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

import * as THREE from 'three';

let renderer, camera, scene, mesh;

const init = () => {
  const outputContainer = document.getElementById('output');

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  outputContainer.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  prepareScene(scene);
  createObjects(scene);

  window.addEventListener(
    'resize',
    function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );
};

const prepareScene = (scene) => {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xb0bec5, 0.5));

  // camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 200);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);
  scene.add(camera);
};

const createObjects = (scene) => {
  mesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5, 5, 5),
    new THREE.MeshPhongMaterial({
      color: 'red',
    })
  );
  scene.add(mesh);
};

const render = () => {
  requestAnimationFrame(render);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

init();
render();

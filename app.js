(function () {
  var renderer;
  var scene;
  var camera;

  var control;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create a simple sphere
    var sphere = new THREE.SphereGeometry(6.5, 20, 20);
    var spherMat = new THREE.MeshLambertMaterial({ color: 0x5555ff });
    var sphereMesh = new THREE.Mesh(sphere, spherMat);
    sphereMesh.receiveShadow = true;
    sphereMesh.position.set(0, 1, 0);
    scene.add(sphereMesh);

    // add an object as pivot point to the sphere
    pivotPoint = new THREE.Object3D();
    pivotPoint.rotation.x = 0.4;
    sphereMesh.add(pivotPoint);

    // create a cube and add to scene
    var cubeGeometry = new THREE.BoxGeometry(2, 4, 2);
    var cubeMaterial = new THREE.MeshLambertMaterial();
    cubeMaterial.color = new THREE.Color('red');
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // position is relative to it's parent
    cube.position.set(14, 4, 6);
    cube.name = 'cube';
    cube.castShadow = true;
    // make the pivotpoint the cube's parent.
    pivotPoint.add(cube);

    // add some light
    var light = new THREE.SpotLight();
    light.position.set(40, 4, 40);
    light.castShadow = true;
    light.shadowMapEnabled = true;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 100;
    scene.add(light);


    // position and point the camera to the center of the scene
    camera.position.x = 25;
    camera.position.y = 26;
    camera.position.z = 23;
    camera.lookAt(scene.position);

    pivotPoint.position = sphereMesh.position;

    document.body.appendChild(renderer.domElement);

    render();

  }

  function render() {
    renderer.render(scene, camera);
    pivotPoint.rotation.x += 0.01;
    // pivotPoint.rotation.y += 0.01;
    // pivotPoint.rotation.z += 0.01;

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;

    requestAnimationFrame(render);
  }

  window.onload = init;
})()
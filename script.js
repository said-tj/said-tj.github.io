let camera, scene, renderer, clock;
let uniforms, mesh;

function init() {
	const container = document.getElementById("shader");

	clock = new THREE.Clock();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 4;

	scene = new THREE.Scene();

const geometry =  new THREE.PlaneGeometry( 2, 2, 128, 128)


	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
    uMouse: { type: "v2", value: new THREE.Vector2() }
	};
uniforms.uMouse.value.x = 0
	const material = new THREE.ShaderMaterial({
    transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
		uniforms,
		vertexShader: document.getElementById("vertex").textContent,
		fragmentShader: document.getElementById("fragment").textContent
	});
  
  
  window.addEventListener('mousemove', function (e) {
  material.uniforms.uMouse.value.x =  (e.clientX / window.innerWidth) * 2 - 1
  material.uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1

})


	 mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({alpha: false});
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
	uniforms.u_time.value = clock.getElapsedTime();
  if(mesh){
    mesh.rotation.x +=0.005
  // mesh.rotation.y +=0.005
     mesh.rotation.z +=0.005
  }
	renderer.render(scene, camera);
}

function animate() {
  
	render();
	requestAnimationFrame(animate);
}

init();
animate();
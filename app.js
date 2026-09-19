import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
camera.position.set(5.8, 2.8, 8.5);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.querySelector('#scene').appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xe9e8e3, 0x222222, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 4.5); key.position.set(-4, 7, 5); key.castShadow = true; scene.add(key);
const rim = new THREE.PointLight(0xd8ff3e, 13, 12); rim.position.set(5, 1, -3); scene.add(rim);

const car = new THREE.Group();
scene.add(car);
const carbon = new THREE.MeshStandardMaterial({ color: 0x171a18, metalness: .9, roughness: .2 });
const carbonLight = new THREE.MeshStandardMaterial({ color: 0x34403b, metalness: .85, roughness: .18 });
const lime = new THREE.MeshStandardMaterial({ color: 0xd8ff3e, metalness: .45, roughness: .25, emissive: 0x283600 });
const glass = new THREE.MeshPhysicalMaterial({ color: 0x101619, metalness: .1, roughness: .05, transmission: .2, transparent: true, opacity: .86 });
function shape(geometry, material, position, rotation = [0,0,0]) { const m = new THREE.Mesh(geometry, material); m.position.set(...position); m.rotation.set(...rotation); m.castShadow = true; m.receiveShadow = true; car.add(m); return m; }
shape(new THREE.BoxGeometry(4.9, .48, 2.05), carbon, [0, .72, 0]);
shape(new THREE.BoxGeometry(2.8, .65, 1.75), carbonLight, [.15, 1.15, 0], [0,0,-.1]);
shape(new THREE.CylinderGeometry(.8, 1.05, 1.85, 4), glass, [.55, 1.3, 0], [Math.PI/2, Math.PI/4, 0]);
shape(new THREE.BoxGeometry(1.65, .1, 2.12), lime, [1.62, .72, 0]);
shape(new THREE.BoxGeometry(2.2, .12, .12), lime, [-1.1, .78, .98]);
shape(new THREE.BoxGeometry(2.2, .12, .12), lime, [-1.1, .78, -.98]);
shape(new THREE.BoxGeometry(1.9, .09, .15), carbonLight, [-1.55, 1.24, 0], [0,0,.1]);
shape(new THREE.BoxGeometry(.08, .45, 1.25), lime, [-2.15, .92, 0]);
for (const x of [-1.65, 1.55]) for (const z of [-1.03, 1.03]) { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.47,.47,.28,32), carbon,); wheel.rotation.x=Math.PI/2; wheel.position.set(x,.48,z); wheel.castShadow=true; car.add(wheel); const hub = new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.3,16), lime); hub.rotation.x=Math.PI/2; hub.position.set(x,.48,z); car.add(hub); }
const floor = new THREE.Mesh(new THREE.CircleGeometry(12, 64), new THREE.MeshBasicMaterial({color:0x151515, transparent:true, opacity:.08})); floor.rotation.x=-Math.PI/2; floor.position.y=.01; scene.add(floor);

let target = { x: 0, y: 0, rot: 0, scale: 1 };
let current = { ...target };
function updateScroll() { const p = scrollY / Math.max(1, document.body.scrollHeight - innerHeight); target.x = THREE.MathUtils.lerp(1.7, -1.8, p); target.y = THREE.MathUtils.lerp(.1, .7, p); target.rot = p * Math.PI * 2.2; target.scale = THREE.MathUtils.lerp(1.05, .82, p); camera.position.x = THREE.MathUtils.lerp(5.8, -4.5, p); camera.position.y = THREE.MathUtils.lerp(2.8, 3.6, p); camera.position.z = THREE.MathUtils.lerp(8.5, 7, p); camera.lookAt(0, .7, 0); }
addEventListener('scroll', updateScroll, { passive:true }); addEventListener('resize', () => { camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }); updateScroll();
function animate() { requestAnimationFrame(animate); current.x += (target.x-current.x)*.055; current.y += (target.y-current.y)*.055; current.rot += (target.rot-current.rot)*.055; current.scale += (target.scale-current.scale)*.055; car.position.set(current.x,current.y,0); car.rotation.y=current.rot; car.rotation.z=Math.sin(current.rot*.5)*.035; car.scale.setScalar(current.scale); rim.intensity=10+Math.sin(Date.now()*.002)*2; renderer.render(scene,camera); } animate();

const cursor = document.querySelector('.cursor'); addEventListener('pointermove', e => { cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px'; });

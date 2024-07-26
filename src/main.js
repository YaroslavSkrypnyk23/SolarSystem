import * as THREE from 'three';
import '../style.css';
import { init } from './init.js';
import { Tween, Easing, update as tweenUpdate } from 'three/examples/jsm/libs/tween.module.js';
import getStarfield from './stars.js';
import { planetSettings } from './planetSettings.js';
import { createOrbit } from './orbit.js';
import { createMercury } from './mercury.js';
import { createVenus } from './venus.js';
import { createEarthAndMoon } from './earth.js';
import { createMars } from './mars.js';
import { createAsteroidsBelt } from './asteroidsBelt.js';
import { createJupiter } from './jupiter.js';
import { createSaturn } from './saturn.js';
import { createUran } from './uran.js';
import { createNeptun } from './neptun.js';
import { or, reflect } from 'three/examples/jsm/nodes/Nodes.js';
const { camera, renderer, scene, size, controls,} = init();
const orbits = [];
const { sizes, planetsDistance, oreolSize, rotationSpeed, settings,} = planetSettings(orbits);

const clock = new THREE.Clock();
const loader = new THREE.TextureLoader();

const sunGroup = new THREE.Group();
scene.add(sunGroup);
sunGroup.rotation.set(0, -1.5, -0.3)

//Creating sun
const sunGeo = new THREE.SphereGeometry(sizes.sun, 32, 32);
const sunMater = new THREE.MeshPhongMaterial({
    map: loader.load('./textures/sun/suntexture.jfif'),
    bumpMap: loader.load('./textures/sun/bumpmapsun.jfif'),
    bumpScale: 50,
    envMap: reflect,
    combine: THREE.MixOperation,
    reflectivity: 1,
    side: THREE.DoubleSide,

});
const sunMesh = new THREE.Mesh(sunGeo, sunMater);
sunGroup.add(sunMesh);

// Sunlight effect for all solar system
const sunLight = new THREE.DirectionalLight(0xffffff, 0.7);
sunLight.position.set(0, 0, -2);
sunGroup.add(sunLight);

//Creating light around sun
const sunEmissiveMater = new THREE.MeshBasicMaterial({
    map: loader.load('./textures/sun/8k_sun.jpg'),
    blending: THREE.AdditiveBlending,
    opacity: 0.4,
});
const sunEmissiveMesh = new THREE.Mesh(sunGeo, sunEmissiveMater);
sunGroup.add(sunEmissiveMesh);


//Add mercury
const { mercuryGroup, mercuryUpdate } = createMercury(rotationSpeed);
const mercuryOrbit = createOrbit(planetsDistance.sunMercury, settings.showOrbit);
sunGroup.add(mercuryGroup);
sunGroup.add(mercuryOrbit);
orbits.push(mercuryOrbit);

//Add venus
const { venGroup, venusUpdate } = createVenus(rotationSpeed);
const venOrbit = createOrbit(planetsDistance.mercuryVenus, settings.showOrbit);
sunGroup.add(venGroup);
sunGroup.add(venOrbit);
orbits.push(venOrbit);

//Add earth and moon
const { earthGroup, earthUpdate } = createEarthAndMoon(rotationSpeed);
const earthOrbit = createOrbit(planetsDistance.venusEarth, settings.showOrbit);
const moonOrbit = createOrbit(planetsDistance.earthMoon, settings.showOrbit);
sunGroup.add(earthGroup);
sunGroup.add(earthOrbit);
earthGroup.add(moonOrbit);
orbits.push(earthOrbit);
orbits.push(moonOrbit);

//Add mars&&deimos&&phobos
const { marsGroup, marsUpdate } = createMars(rotationSpeed);
const marsOrbit = createOrbit(planetsDistance.earthMars, settings.showOrbit);
const deimosOrbit = createOrbit(planetsDistance.marsDeimos, settings.showOrbit);
const phobosOrbit = createOrbit(planetsDistance.marsPhobos, settings.showOrbit);
marsGroup.add(deimosOrbit);
marsGroup.add(phobosOrbit);
sunGroup.add(marsGroup);
sunGroup.add(marsOrbit);
orbits.push(marsOrbit);
orbits.push(deimosOrbit);
orbits.push(phobosOrbit);

//Add asteroid belt
const { asterGroup, asteroidUpdate } = createAsteroidsBelt(settings.asteroids, planetsDistance.marsAsterBelt);
sunGroup.add(asterGroup);

//Add Jupiter
const { jupiterGroup, jupiterUpdate } = createJupiter(rotationSpeed);
const jupiterOrbit = createOrbit(planetsDistance.marsJupiter, settings.showOrbit);
sunGroup.add(jupiterGroup);
sunGroup.add(jupiterOrbit);
orbits.push(jupiterOrbit);

//Add Saturn
const { saturnGroup, saturnUpdate } = createSaturn(rotationSpeed);
const saturnOrbit = createOrbit(planetsDistance.jupiterSaturn, settings.showOrbit);
sunGroup.add(saturnGroup);
sunGroup.add(saturnOrbit);
orbits.push(saturnOrbit);

//Add Uran
const { uranGroup, uranUpdate } = createUran(rotationSpeed);
const uranOrbit = createOrbit(planetsDistance.saturnUranus, settings.showOrbit);
sunGroup.add(uranGroup);
sunGroup.add(uranOrbit);
orbits.push(uranOrbit)

//Add Neptune
const { neptunGroup, neptunUpdate } = createNeptun(rotationSpeed);
const neptunOrbit = createOrbit(planetsDistance.uranusNeptune, settings.showOrbit);
sunGroup.add(neptunGroup);
sunGroup.add(neptunOrbit);
orbits.push(neptunOrbit);



//Stars-bg
const stars = getStarfield({ numStars: 30000 });
scene.add(stars);

// Start camera animation
const animateCamera = () => {
    new Tween(camera.position)
        .to({ z: 100 }, 15000) // Move to z = 300 in 10 seconds
        .easing(Easing.Quadratic.InOut)
        .start();
};

document.getElementById('start').addEventListener('click', () => {
    const audioEffect = document.querySelector('.space-bg_audio');
    audioEffect.volume = 0.2;
    if (!document.fullscreenElement) {
        renderer.domElement.requestFullscreen();
        audioEffect.play();
    } else {
        document.exitFullscreen();
    }
    document.querySelector('.canvas').style.display = 'block';
    animateCamera();
    document.querySelector('.nav').style.display = 'none';
});

document.getElementById('refuse').addEventListener('click', () => {
    alert("Come man!Just push the start button!Don't be afraid!");
});

const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    sunMesh.rotation.y -= delta * rotationSpeed.sun;
    sunEmissiveMesh.rotation.y -= delta * rotationSpeed.sun;
    mercuryUpdate(delta, rotationSpeed.mercury);
    venusUpdate(delta, rotationSpeed.venus);
    earthUpdate(delta, rotationSpeed.earth);
    marsUpdate(delta, rotationSpeed.mars);
    asteroidUpdate(delta, rotationSpeed.asterBelt)
    jupiterUpdate(delta, rotationSpeed.jupiter);
    saturnUpdate(delta, rotationSpeed.saturn);
    uranUpdate(delta, rotationSpeed.uranus);
    neptunUpdate(delta, rotationSpeed.neptune)
    stars.rotation.y -= delta * rotationSpeed.stars;
    tweenUpdate();
    renderer.render(scene, camera);
};

animate();


window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
});

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        renderer.domElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

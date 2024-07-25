import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize} = planetSettings();

export const createUran = () => {
    const loader = new THREE.TextureLoader();
    const uranGroup = new THREE.Group();
    const geo = new THREE.SphereGeometry(sizes.uranus, 32, 32);

    const mat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/uranus/uranusmap.jpg'),
        bumpMap: loader.load('./textures/uranus/uranusbumptexture.jpg'),
        bumpScale: 4,
    });

    const uranMesh = new THREE.Mesh(geo, mat);
    uranGroup.add(uranMesh);

    //Asteroid ring for Uranus
    const ringGeo = new THREE.RingGeometry(sizes.uranus*1.2, sizes.uranus*1.7, 64);
    const ringMat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/uranus/uranusmap.jpg'),
        side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0;
    uranGroup.add(ringMesh);
    uranGroup.rotation.set(0.4,0,0);


    const uranUpdate = (delta, speed) => {
        uranGroup.position.set(
            Math.cos(uranGroup.rotation.y) * planetsDistance.saturnUranus,
            0,
            Math.sin(uranGroup.rotation.y) * planetsDistance.saturnUranus
        );
        uranGroup.rotation.y += delta * speed;
        uranMesh.rotation.y -= delta * speed * 4;
    };

    return { uranGroup, uranUpdate };
};

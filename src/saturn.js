import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize } = planetSettings();

export const createSaturn = () => {
    const loader = new THREE.TextureLoader();
    const saturnGroup = new THREE.Group();

    // Saturn
    const saturnGeo = new THREE.SphereGeometry(sizes.saturn, 32, 32);
    const saturnMat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/saturn/saturnmap.jpg'),
        bumpMap: loader.load('./textures/saturn/saturnbumpmap.jfif'),
        bumpScale: 2,
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnGroup.add(saturnMesh);

    // Saturn's Ring
    const ringGeo = new THREE.RingGeometry(sizes.saturn * 1.2, sizes.saturn * 2.4, 64);
    const ringMat = new THREE.MeshBasicMaterial({
        map: loader.load('./textures/saturn/saturn-ring-texturemap.webp'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0;

    saturnGroup.add(ringMesh);
    saturnGroup.rotation.set(0.2,0,0);

    const saturnUpdate = (delta, speed) => {
        saturnGroup.position.set(
            Math.cos(saturnGroup.rotation.y) * planetsDistance.jupiterSaturn,
            0,
            Math.sin(saturnGroup.rotation.y) * planetsDistance.jupiterSaturn
        );
        saturnGroup.rotation.y += delta * speed;
        saturnMesh.rotation.y -= delta * speed * 4;
    };

    return { saturnGroup, saturnUpdate };
};

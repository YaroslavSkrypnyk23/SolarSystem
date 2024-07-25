import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize} = planetSettings();

export const createJupiter = () => {
    const loader = new THREE.TextureLoader();
    const jupiterGroup = new THREE.Group();
    const geo = new THREE.SphereGeometry(sizes.jupiter, 32, 32);

    const mat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/jupiter/jupitermap.jpg'),
        bumpMap: loader.load('./textures/jupiter/jupiterbump_map.jpg'),
        bumpScale: 2,
    });

    const jupiterMesh = new THREE.Mesh(geo, mat);
    jupiterGroup.add(jupiterMesh);

    // Atmosphere effect
    const atmMat = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        alphaMap: loader.load('./textures/jupiter/jupiteralpha_map.avif'),
    });
    const atmGeo = new THREE.SphereGeometry(oreolSize.jupiter,32,32);
    const atmMesh = new THREE.Mesh(atmGeo, atmMat);
    atmMesh.scale.setScalar(1.003);
    jupiterGroup.add(atmMesh);


    const jupiterUpdate = (delta, speed) => {
        jupiterGroup.position.set(
            Math.cos(jupiterGroup.rotation.y) * planetsDistance.marsJupiter,
            0,
            Math.sin(jupiterGroup.rotation.y) * planetsDistance.marsJupiter
        );
        jupiterGroup.rotation.y += delta * speed;
        jupiterMesh.rotation.y -= delta * speed * 4;
        atmMesh.rotation.y -= delta * speed * 4;
    };

    return { jupiterGroup, jupiterUpdate };
};

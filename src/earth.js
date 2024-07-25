import * as THREE from 'three';
import { getFresnelMat } from './fresnelMat.js';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize, rotationSpeed, baseRotationSpeed } = planetSettings();

export const createEarthAndMoon = () => {
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    earthGroup.position.set(10, 0, 0)


    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(sizes.earth, 32, 32);

    // Creating Earth
    const material = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/earth/00_earthmap1k.jpg'),
        specularMap: loader.load('./textures/earth/02_earthspec1k.jpg'),
        bumpMap: loader.load('./textures/earth/01_earthbump1k.jpg'),
        bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // Electricity effect
    const lightsMat = new THREE.MeshBasicMaterial({
        map: loader.load('./textures/earth/03_earthlights1k.jpg'),
        blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    // Clouds effect
    const cloudsMat = new THREE.MeshStandardMaterial({
        map: loader.load('./textures/earth/04_earthcloudmap.jpg'),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        alphaMap: loader.load('./textures/earth/05_earthcloudmaptrans.jpg'),
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    // Glow effect
    const fresnelMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    // Creating moon
    const moonGroup = new THREE.Group();
    const moonGeometry = new THREE.SphereGeometry(0.3, 32, 16);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: loader.load('./textures/moon/moonmap4k.jpg'),
        bumpMap: loader.load('./textures/moon/moonbump4k.jpg'),
        bumpScale: 0.04,
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.set(planetsDistance.earthMoon, 0, 0);
    moonGroup.add(moonMesh);
    earthGroup.add(moonGroup);

    const earthUpdate = (delta,speed) => {
        earthGroup.rotation.y += delta * speed;
        earthMesh.rotation.y -= delta * speed * 4;
        lightsMesh.rotation.y -= delta * speed * 4;
        cloudsMesh.rotation.y -= delta * speed * 4;
        glowMesh.rotation.y -= delta * speed * 4;
        earthGroup.position.set(
            Math.cos(earthGroup.rotation.y) * planetsDistance.venusEarth,
            0,
            Math.sin(earthGroup.rotation.y) * planetsDistance.venusEarth
        )
        moonGroup.rotation.y -= delta * speed* 10;
        moonMesh.rotation.y -= delta * speed * 4;
    };

    return { earthGroup, earthUpdate };
};

import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, settings } = planetSettings();

export const createAsteroidsBelt = (amount, distance) => {
    const loader = new THREE.TextureLoader();
    const textures = [
        loader.load('./textures/asteriods/asteriodtexture.jfif'),
        loader.load('./textures/asteriods/asteriodtexture2.jfif'),
        loader.load('./textures/asteriods/asteriodtexture3.jfif'),
        loader.load('./textures/asteriods/asteriodtexture4.jfif'),
    ];

    const getRandomTexture = () => {
        const randomIndex = Math.floor(Math.random() * textures.length);
        return textures[randomIndex];
    };

    const asterGroup = new THREE.Group();
    const innerRadius = distance - 0.1;
    const outerRadius = distance + 20;

    const asterGeo = new THREE.TetrahedronGeometry(0.5, 1);

    for (let i = 0; i < amount; i++) {
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
        const theta = Math.random() * 2 * Math.PI;
        const x = radius * Math.cos(theta);
        const y = Math.random() * 2 - 1;
        const z = radius * Math.sin(theta);
        const randomSize = Math.random() * 0.5 + 0.1;

        const asterMat = new THREE.MeshPhongMaterial({
            map: getRandomTexture(),
            shininess: 100,
        });

        const asteroidMesh = new THREE.Mesh(asterGeo, asterMat);
        asteroidMesh.position.set(x, y, z);
        asteroidMesh.scale.set(randomSize, randomSize, randomSize);
        asterGroup.add(asteroidMesh);
    }


    // Animation
    const asteroidUpdate = (delta, speed) => {
        asterGroup.rotation.y -= delta * speed;
    };

    return { asterGroup, asteroidUpdate };
};

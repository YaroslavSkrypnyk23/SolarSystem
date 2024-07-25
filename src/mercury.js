import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize, rotationSpeed } = planetSettings();

export const createMercury = () => {
    const loader = new THREE.TextureLoader();
    const mercuryGroup = new THREE.Group();
    const mercuryMat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/mercury/mercurymap.jpg'),
        bumpMap: loader.load('./textures/mercury/mercury-surface.jpg'),
        bumpScale: 3,
    });
    const mercuryGeo = new THREE.SphereGeometry(sizes.mercury, 64, 64);
    const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
    mercuryGroup.add(mercuryMesh);

    //Ozone effect
    const ozoneGeo = new THREE.SphereGeometry(oreolSize.mercury, 32, 32);
    const ozoneMat = new THREE.MeshStandardMaterial({
        alphaMap: loader.load('./textures/mercury/mercury-ozone-light.webp'),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5,
    });
    const ozoneMesh = new THREE.Mesh(ozoneGeo, ozoneMat);
    ozoneMesh.scale.setScalar(1.003);
    mercuryGroup.add(ozoneMesh);

    const mercuryUpdate = (delta, speed) => {
        mercuryGroup.position.set(
            Math.cos(mercuryGroup.rotation.y) * planetsDistance.sunMercury,
            0,
            Math.sin(mercuryGroup.rotation.y) * planetsDistance.sunMercury
        );
        mercuryGroup.rotation.y += delta * speed;
        mercuryMesh.rotation.y -= delta * speed * 4;
        ozoneMesh.rotation.y -= delta * speed * 4;
    }
    return { mercuryGroup, mercuryUpdate };
}
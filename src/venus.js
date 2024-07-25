import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize, rotationSpeed } = planetSettings();
export const createVenus = () => {
    const loader = new THREE.TextureLoader();
    const venGroup = new THREE.Group();
    const venGeo = new THREE.SphereGeometry(sizes.venus, 32,32);
    const venMat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/venus/venusmap.jpg'),
        specularMap: loader.load('./textures/venus/venus-dark.jpg'),
        bumpMap: loader.load('./textures/venus/venusbump.jpg'),
        bumpScale: 1,
    })
    const venMesh = new THREE.Mesh(venGeo,venMat);
    venGroup.add(venMesh);

    const oreolGeo = new THREE.SphereGeometry(oreolSize.venus, 32,32);
    const oreolMat = new THREE.MeshBasicMaterial({
        map: loader.load('./textures/venus/venus-oreol.jfif'),
        blending: THREE.AdditiveBlending,
        opacity: 0.2,
    });
    const venucOreol = new THREE.Mesh(oreolGeo, oreolMat);
    venucOreol.scale.setScalar(1.01);
    venGroup.add(venucOreol);


    const venusUpdate = (delta,speed) => {
        venGroup.position.set(
            Math.cos(venGroup.rotation.y) * planetsDistance.mercuryVenus,
            0,
            Math.sin(venGroup.rotation.y) * planetsDistance.mercuryVenus
        );
        venGroup.rotation.y += delta * speed;
        venMesh.rotation.y -= delta * speed * 4;
        venucOreol.rotation.y -= delta * speed * 4;
    }
    return {venGroup, venusUpdate};
};
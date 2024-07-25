import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize} = planetSettings();

export const createNeptun = () => {
    const loader = new THREE.TextureLoader();
    const neptunGroup = new THREE.Group();
    const geo = new THREE.SphereGeometry(sizes.uranus, 32, 32);

    const mat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/neptune/neptunemap.jpg'),
        bumpMap: loader.load('./textures/uranus/uranusbumptexture.jpg'),
        bumpScale: 4,
    });

    const neptunMesh = new THREE.Mesh(geo, mat);
    neptunGroup.add(neptunMesh);


    const neptunUpdate = (delta, speed) => {
        neptunGroup.position.set(
            Math.cos(neptunGroup.rotation.y) * planetsDistance.uranusNeptune,
            0,
            Math.sin(neptunGroup.rotation.y) * planetsDistance.uranusNeptune
        );
        neptunGroup.rotation.y += delta * speed;
        neptunMesh.rotation.y -= delta * speed * 4;
    };

    return {neptunGroup , neptunUpdate };
};

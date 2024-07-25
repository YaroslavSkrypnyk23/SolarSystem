import * as THREE from 'three';

export const createOrbit = (distance) => {
    const geo = new THREE.RingGeometry(distance - 0.1,distance + 0.1, 64);
    const mat = new THREE.MeshBasicMaterial({
        color: 'white',
        side: THREE.DoubleSide,
    });
    const orbit = new THREE.Mesh(geo,mat);
    orbit.rotation.x = Math.PI / 2;
    return orbit;
};
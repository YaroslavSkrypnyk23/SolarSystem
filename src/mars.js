import * as THREE from 'three';
import { planetSettings } from './planetSettings';

const { sizes, planetsDistance, oreolSize, rotationSpeed, baseRotationSpeed } = planetSettings();

export const createMars = () => {
    const loader = new THREE.TextureLoader();

    const marsGroup = new THREE.Group();

    // Creating the Mars geometry and material
    const marsGeo = new THREE.SphereGeometry(sizes.mars, 32, 32);
    const marsMat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/mars/mars-clouds.jfif'),
        bumpMap: loader.load('./textures/mars/mars_bump_map_8k.jpg'),
        bumpScale: 10,
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsGroup.add(marsMesh);

    // Creating the halo around Mars
    const oreolGeo = new THREE.SphereGeometry(oreolSize.mars, 32, 32);
    const oreolMat = new THREE.MeshStandardMaterial({
        map: loader.load('./textures/mars/mars-oreol.jpeg'),
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        alphaMap: loader.load('./textures/mars/mars-clouds.jfif'),
    });
    const marsOreol = new THREE.Mesh(oreolGeo, oreolMat);
    marsOreol.scale.setScalar(1.05);
    marsGroup.add(marsOreol);

    const deimosGeo = new THREE.TetrahedronGeometry(sizes.deimos, 1);
    const deimosMat = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/mars/deimos.texture.jpg'),
        bumpMap: loader.load('./textures/mars/mars_bump_map_8k.jpg'),
        bumpScale: 7,
    });
    const deimosMesh = new THREE.Mesh(deimosGeo, deimosMat);
    const deimosGroup = new THREE.Group();
    deimosGroup.add(deimosMesh);

    const phobosGeo = new THREE.TetrahedronGeometry(sizes.phobos, 1);
    const phobosMater = new THREE.MeshPhongMaterial({
        map: loader.load('./textures/mars/phobos_texture_map.jpg'),
        bumpMap: loader.load('./textures/mars/phobosbump.jpg'),
        bumpScale: 7,
    });
    const phobosMesh = new THREE.Mesh(phobosGeo, phobosMater);
    const phobosGroup = new THREE.Group();
    phobosGroup.add(phobosMesh);


    deimosGroup.position.set(planetsDistance.deimos, 0, 0);
    phobosGroup.position.set(planetsDistance.phobos, 0, 0);

    marsGroup.add(deimosGroup)
    marsGroup.add(phobosGroup)

    const marsUpdate = (delta, speed) => {
        marsGroup.position.set(
            Math.cos(marsGroup.rotation.y) * planetsDistance.earthMars,
            0,
            Math.sin(marsGroup.rotation.y) * planetsDistance.earthMars
        );
        marsGroup.rotation.y += delta * speed;
        marsMesh.rotation.y -= delta * speed * 4;
        marsOreol.rotation.y -= delta * speed * 4;

        phobosGroup.position.set(
            Math.cos(phobosGroup.rotation.y) * planetsDistance.marsPhobos,
            0,
            Math.sin(phobosGroup.rotation.y) * planetsDistance.marsPhobos
        );
        phobosGroup.rotation.y += delta * speed * 8;
        phobosMesh.rotation.y -= delta * speed * 60;
        phobosMesh.rotation.x -= delta * speed * 40;
        phobosMesh.rotation.z -= delta * speed * 30;


        deimosGroup.position.set(
            Math.cos(deimosGroup.rotation.y) * planetsDistance.marsDeimos,
            0,
            Math.sin(deimosGroup.rotation.y) * planetsDistance.marsDeimos
        );
        deimosGroup.rotation.y += delta * speed * 13;
        deimosMesh.rotation.y -= delta * speed * 30;
        deimosMesh.rotation.x -= delta * speed * 20;
        deimosMesh.rotation.z -= delta * speed * 25;
    };
    return { marsGroup, marsUpdate };
};

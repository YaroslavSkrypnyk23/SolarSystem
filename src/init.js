import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export const init = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000000);
    camera.position.set(-20, 0, 5500);

    const scene = new THREE.Scene();
    const size = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    const canvas = document.querySelector('.canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setSize(size.width, size.height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.update();


    return { camera, renderer, scene, size, canvas, controls};
};

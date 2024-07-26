import * as dat from 'lil-gui';

export function planetSettings(orbits) {
    const sizes = {
        mercury: 1,
        venus: 2,
        earth: 2.5,
        mars: 2,
        asterBelt: {
            innerRad: 11,
            outerRad: 14,
        },
        jupiter: 7,
        saturn: 5,
        uranus: 4,
        neptune: 4,
        pluto: 0.5,
        sun: 10,
        moon: 0.3,
        phobos: 0.5,
        deimos: 0.3,
    };

    const planetsDistance = {
        sunMercury: 2 * sizes.sun,
        mercuryVenus: 4 * sizes.sun,
        venusEarth: 6 * sizes.sun,
        earthMars: 8 * sizes.sun,
        earthMoon: 0.5 * sizes.sun,
        marsAsterBelt: 9 * sizes.sun,
        marsJupiter: 12 * sizes.sun,
        marsPhobos: 0.3 * sizes.sun,
        marsDeimos: 0.6 * sizes.sun,
        jupiterSaturn: 15 * sizes.sun,
        saturnUranus: 18 * sizes.sun,
        uranusNeptune: 20 * sizes.sun,
        neptunePluto: 19 * sizes.sun,
    };

    const oreolSize = {
        sun: sizes.sun + 0.4,
        mercury: sizes.mercury + 0.02,
        venus: sizes.venus + 0.1,
        earth: sizes.earth + 1,
        mars: sizes.mars + 0.1,
        jupiter: sizes.jupiter + 0.1,
        saturn: sizes.saturn + 0.1,
        uranus: sizes.uranus + 0.1,
        pluto: sizes.pluto + 0.1,
        moon: sizes.moon + 0.1,
        phobos: sizes.phobos + 0.1,
        deimos: sizes.deimos + 0.1,
    };

    const baseRotationSpeed = {
        stars: 0.05,
        sun: 0.01,
        mercury: 0.05,
        venus: 0.04,
        earth: 0.04,
        moon: 0.09,
        mars: 0.05,
        asterBelt: 0.03,
        phobos: 0.03,
        deimos: 0.1,
        jupiter: 0.03,
        saturn: 0.02,
        uranus: 0.04,
        neptune: 0.02,
        pluto: 0.001
    };

    const settings = {
        speed: 1,
        showOrbit: false,
        asteroids: 10000,
    };

    const rotationSpeed = {};

    const gui = new dat.GUI();
    const rotateFolder = gui.addFolder('Швидкість обертання');
    const orbitVisibFolder = gui.addFolder('Видимість орбіти');
    
    rotateFolder.add(settings, 'speed', 0, 20, 0.1).name();
    orbitVisibFolder.add(settings, 'showOrbit').name().onChange(() => {
        orbits.forEach(orbit => {
            orbit.visible = settings.showOrbit;
        });
    });
    const updateRotationSpeed = () => {
        for (const planet in baseRotationSpeed) {
            rotationSpeed[planet] = baseRotationSpeed[planet] * settings.speed;
        }
    };
    updateRotationSpeed();
    rotateFolder.onChange(updateRotationSpeed);

    return { sizes, planetsDistance, oreolSize, rotationSpeed, settings };
}

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Constants
const CUBE_SIZE = 1;
const SPACING = 1.1;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const GRID_X_OFFSET = (GRID_WIDTH * SPACING) / 2;
const GRID_Y_OFFSET = (GRID_HEIGHT * SPACING) / 2;

// Animation states
const State = {
    NORMAL: 0,
    RISING: 1,
    ROTATING: 2,
    LOWERING: 3
};

// Materials
const createMaterials = () => {
    return {
        basalt: new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.7,
            metalness: 0.2
        }),
        lavaEmissive: new THREE.MeshStandardMaterial({
            color: 0xff5500,
            emissive: 0xff3300,
            emissiveIntensity: 0.8,
            roughness: 0.4,
            metalness: 0.1
        }),
        brightLava: new THREE.MeshStandardMaterial({
            color: 0xff8800,
            emissive: 0xff6600,
            emissiveIntensity: 0.5,
            roughness: 0.5,
            metalness: 0.3
        })
    };
};

// Utility class for deterministic randomization
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
}

const LavaWall = ({ seed = 12345, height = "100vh", width = "100%" }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const cubesRef = useRef([]);
    const mouseRef = useRef(new THREE.Vector2());

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup
        const { scene, camera, renderer, cleanupFn } = setupScene();
        const rng = new SeededRandom(seed);

        // Create cubes
        createCubes(scene, rng);

        // Start animation
        animate();

        return cleanupFn;
    }, [seed]);

    const setupScene = () => {
        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;

        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Setup camera
        const camera = new THREE.PerspectiveCamera(
            75,
            containerWidth / containerHeight,
            0.1,
            1000
        );
        camera.position.z = 10;
        camera.frustumCulled = true;
        cameraRef.current = camera;

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Clear container and append renderer
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Add lights
        addLights(scene);

        // Add event listeners
        const onMouseMove = createMouseMoveHandler(containerWidth, containerHeight);
        window.addEventListener('mousemove', onMouseMove);

        const handleResize = createResizeHandler();
        window.addEventListener('resize', handleResize);

        // Cleanup function
        const cleanupFn = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            rendererRef.current.setAnimationLoop(null);

            if (mountRef.current?.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }

            disposeResources();
        };

        return { scene, camera, renderer, cleanupFn };
    };

    const addLights = (scene) => {
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight1.position.set(5, 5, 5);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight2.position.set(-5, -5, 5);
        scene.add(directionalLight2);
    };

    const createMouseMoveHandler = (containerWidth, containerHeight) => {
        return (event) => {
            if (!mountRef.current) return;

            const rect = mountRef.current.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / containerWidth) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / containerHeight) * 2 + 1;
        };
    };

    const createResizeHandler = () => {
        return () => {
            if (!mountRef.current) return;

            const camera = cameraRef.current;
            const renderer = rendererRef.current;

            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
    };

    const createCubes = (scene, rng) => {
        const materials = createMaterials();
        const cubeGeometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
        const cubes = [];
        cubesRef.current = cubes;

        for (let x = 0; x < GRID_WIDTH; x++) {
            for (let y = 0; y < GRID_HEIGHT; y++) {
                const random = rng.random();
                let material = random < 0.6
                    ? materials.basalt
                    : random < 0.85
                        ? materials.brightLava
                        : materials.lavaEmissive;

                const cube = new THREE.Mesh(cubeGeometry, material);
                cube.position.set(
                    (x * SPACING) - GRID_X_OFFSET,
                    (y * SPACING) - GRID_Y_OFFSET,
                    0
                );

                // Initial state
                cube.state = State.NORMAL;
                cube.rotationProgress = 0;
                cube.rotationDirection = 1;
                cube.rotationAxis = new THREE.Vector2(0, 0);

                scene.add(cube);
                cubes.push(cube);
            }
        }
    };

    const animate = () => {
        const camera = cameraRef.current;
        const cubes = cubesRef.current;

        cubes.forEach(updateCube);

        // Limit to 30 FPS
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 1000 / 30);

        rendererRef.current.render(sceneRef.current, camera);
    };

    const updateCube = (cube) => {
        // Random chance to start rising
        if (cube.state === State.NORMAL && Math.random() < 0.001) {
            startCubeRising(cube);
        }

        // Handle rising animation
        if (cube.state === State.RISING) {
            const targetZ = 2;
            cube.position.z += (targetZ - cube.position.z) * 0.1;

            if (Math.abs(cube.position.z - targetZ) < 0.05) {
                cube.position.z = targetZ;
                cube.state = State.ROTATING;
            }
        }

        // Handle rotation animation
        if (cube.state === State.ROTATING) {
            rotateCube(cube);
        }

        // Handle lowering animation
        if (cube.state === State.LOWERING) {
            cube.position.z += (0 - cube.position.z) * 0.1;

            if (cube.position.z <= 0.05) {
                cube.position.z = 0;
                cube.state = State.NORMAL;
            }
        }
    };

    const startCubeRising = (cube) => {
        cube.state = State.RISING;

        const r = Math.random();
        const r2 = Math.random();

        cube.rotationAxis.x = r < 0.5 ? 1 : 0;
        cube.rotationAxis.y = r >= 0.5 ? 1 : 0;
        cube.rotationDirection = r2 > 0.5 ? 1 : -1;
        cube.rotationProgress = 0;
    };

    const rotateCube = (cube) => {
        const rotationSpeed = 0.15;

        cube.rotation.x += cube.rotationDirection * cube.rotationAxis.x * rotationSpeed;
        cube.rotation.y += cube.rotationDirection * cube.rotationAxis.y * rotationSpeed;
        cube.rotationProgress += rotationSpeed;

        if (cube.rotationProgress > Math.PI) {
            cube.state = State.LOWERING;
            cube.rotationProgress = 0;
            cube.rotation.set(0, 0, 0);
        }
    };

    const disposeResources = () => {
        sceneRef.current?.traverse(object => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                object.material.dispose();
            }
        });

        rendererRef.current?.dispose();
    };

    return (
        <div ref={mountRef} className="fixed inset-0 w-screen h-screen z-0" />
    );
};

export default LavaWall;
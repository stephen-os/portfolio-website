import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
}

const RenderPhase = {
    NORMAL: 0,
    RISING: 1,
    ROTATING: 2,
    LOWERING: 3
};

const LavaWall = ({ seed = 12345, height = "100vh", width = "100%" }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const cubesRef = useRef([]);
    const hoveredCubeRef = useRef(null);
    const mouseRef = useRef(new THREE.Vector2());
    const raycasterRef = useRef(new THREE.Raycaster());

    useEffect(() => {
        if (!mountRef.current) return;

        // Get actual container dimensions
        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;

        // Initialize scene (only once)
        const rng = new SeededRandom(seed);
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        camera.position.z = 10;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Clear previous canvas if it exists
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight1.position.set(5, 5, 5);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight2.position.set(-5, -5, 5);
        scene.add(directionalLight2);

        const cubeSize = 1;
        const spacing = 1.1;
        const gridWidth = 30;
        const gridHeight = 20;
        const gridXOffset = (gridWidth * spacing) / 2;
        const gridYOffset = (gridHeight * spacing) / 2;

        // Materials
        const basaltMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.7, metalness: 0.2 });
        const lavaEmissiveMaterial = new THREE.MeshStandardMaterial({ color: 0xff5500, emissive: 0xff3300, emissiveIntensity: 0.8, roughness: 0.4, metalness: 0.1 });
        const brightLavaMaterial = new THREE.MeshStandardMaterial({ color: 0xff8800, emissive: 0xff6600, emissiveIntensity: 0.5, roughness: 0.5, metalness: 0.3 });

        const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubes = [];
        cubesRef.current = cubes;

        // Create the cubes (only once)
        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                const random = rng.random();
                let material = random < 0.6 ? basaltMaterial : random < 0.85 ? brightLavaMaterial : lavaEmissiveMaterial;

                const cube = new THREE.Mesh(cubeGeometry, material);
                cube.position.set((x * spacing) - gridXOffset, (y * spacing) - gridYOffset, 0);
                cube.userData = { state: "normal", rotationProgress: 0, rotationDirection: 1, rotationAxis: new THREE.Vector2(0, 0) };
                scene.add(cube);
                cubes.push(cube);
            }
        }

        // Mouse move event handler - use container-relative coordinates
        const onMouseMove = (event) => {
            const rect = mountRef.current.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / containerWidth) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / containerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = () => {
            // requestAnimationFrame(animate);
            const camera = cameraRef.current;
            const cubes = cubesRef.current;

            cubes.forEach((cube) => {
                // If the cube is selected to animate and it's currently at rest
                if (cube.userData.state === "normal" && Math.random() < 0.001) {
                    cube.userData.state = "rising";

                    const r = Math.random();
                    const r2 = Math.random();
                    cube.userData.rotationAxis.x = r < 0.5 ? 1 : 0;
                    cube.userData.rotationAxis.y = r >= 0.5 ? 1 : 0;
                    cube.userData.rotationDirection = r2 > 0.5 ? 1 : -1;
                    cube.userData.rotationProgress = 0;
                }

                // Handle animation states
                if (cube.userData.state === "rising") {
                    const targetZ = 2;
                    cube.position.z += (targetZ - cube.position.z) * 0.1;
                    if (Math.abs(cube.position.z - targetZ) < 0.05) {
                        cube.position.z = targetZ;
                        cube.userData.state = "rotating";
                    }
                }

                if (cube.userData.state === "rotating") {
                    const rotationSpeed = 0.15;

                    cube.rotation.x += cube.userData.rotationDirection * cube.userData.rotationAxis.x * rotationSpeed;
                    cube.rotation.y += cube.userData.rotationDirection * cube.userData.rotationAxis.y * rotationSpeed;

                    cube.userData.rotationProgress += rotationSpeed

                    if (cube.userData.rotationProgress > Math.PI) {
                        cube.userData.state = "lowering";
                        cube.userData.rotationProgress = 0;
                        cube.rotation.set(0, 0, 0);
                    }
                }

                if (cube.userData.state === "lowering") {
                    cube.position.z += (0 - cube.position.z) * 0.1;
                    if (cube.position.z <= 0.05) {
                        cube.position.z = 0;
                        cube.userData.state = "normal";
                    }
                }
            });

            setTimeout(function () {

                requestAnimationFrame(animate);

            }, 1000 / 30);

            rendererRef.current.render(sceneRef.current, camera);
        };

        animate();

        // Handle window resizing - only adjust camera and renderer
        const handleResize = () => {
            if (!mountRef.current) return;

            const camera = cameraRef.current;
            const renderer = rendererRef.current;

            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;

            // Only update camera aspect ratio and renderer size
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);

            rendererRef.current.setAnimationLoop(null);

            if (mountRef.current) {
                mountRef.current.removeChild(mountRef.current.firstChild);
            }

            sceneRef.current.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    object.material.dispose();
                }
            });

            cubeGeometry.dispose();
            basaltMaterial.dispose();
            lavaEmissiveMaterial.dispose();
            brightLavaMaterial.dispose();
            rendererRef.current.dispose();
        };
    }, [seed]); // Only depend on seed to ensure the wall is generated once

    return (
        <div ref={mountRef} className="fixed inset-0 w-screen h-screen z-0" />
    );
};

export default LavaWall;
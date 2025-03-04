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

const Background = ({ seed = 12345, height = "100vh", width = "100%" }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const cubeDataRef = useRef([]);
    const mouseRef = useRef(new THREE.Vector2());
    const lastFrameTimeRef = useRef(0);
    const instancedMeshesRef = useRef({});
    const frameInterval = 1000 / 30; // Target 30 FPS
    const matrixRef = useRef(new THREE.Matrix4());
    const quaternionRef = useRef(new THREE.Quaternion());

    useEffect(() => {
        if (!mountRef.current) return;

        // Setup
        const { scene, camera, renderer, cleanupFn } = setupScene();
        const rng = new SeededRandom(seed);

        // Create instancedMeshes and cube data
        createInstancedCubes(scene, rng);

        // Start animation
        requestAnimationFrame(animate);

        return cleanupFn;
    }, [seed]);

    const setupScene = () => {
        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;

        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Setup camera with frustum culling enabled
        const camera = new THREE.PerspectiveCamera(
            75,
            containerWidth / containerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 8);
        camera.lookAt(0, 0, 0);
        camera.frustumCulled = true;
        cameraRef.current = camera;

        // Setup optimized renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.precision = 'mediump'; // Use medium precision for better performance

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
            renderer.setAnimationLoop(null);

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

    // Create optimized materials
    const createMaterials = () => {
        return {
            basalt: new THREE.MeshLambertMaterial({
                color: 0x333333
            }),
            lavaEmissive: new THREE.MeshLambertMaterial({
                color: 0xff5500,
                emissive: 0xff3300,
                emissiveIntensity: 0.8
            }),
            brightLava: new THREE.MeshLambertMaterial({
                color: 0xff8800,
                emissive: 0xff6600,
                emissiveIntensity: 0.5
            })
        };
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

    const createInstancedCubes = (scene, rng) => {
        const materials = createMaterials();
        const cubeGeometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
        const instanceCount = GRID_WIDTH * GRID_HEIGHT;

        // Create counts for each material type
        const basaltCount = Math.ceil(instanceCount * 0.6) + 7; // +7 to account distribution greater that 0.6
        const brightLavaCount = Math.ceil(instanceCount * 0.25);
        const lavaEmissiveCount = Math.ceil(instanceCount * 0.15);

        // Create one instanced mesh per material type
        const basaltInstances = new THREE.InstancedMesh(
            cubeGeometry,
            materials.basalt,
            basaltCount
        );
        basaltInstances.count = 0;

        const brightLavaInstances = new THREE.InstancedMesh(
            cubeGeometry,
            materials.brightLava,
            brightLavaCount
        );
        brightLavaInstances.count = 0;

        const lavaEmissiveInstances = new THREE.InstancedMesh(
            cubeGeometry,
            materials.lavaEmissive,
            lavaEmissiveCount
        );
        lavaEmissiveInstances.count = 0;

        instancedMeshesRef.current = {
            basalt: basaltInstances,
            brightLava: brightLavaInstances,
            lavaEmissive: lavaEmissiveInstances
        };

        scene.add(basaltInstances);
        scene.add(brightLavaInstances);
        scene.add(lavaEmissiveInstances);

        const matrix = matrixRef.current;
        const cubeData = [];

        for (let x = 0; x < GRID_WIDTH; x++) {
            for (let y = 0; y < GRID_HEIGHT; y++) {
                const random = rng.random();
                const position = new THREE.Vector3(
                    (x * SPACING) - GRID_X_OFFSET,
                    (y * SPACING) - GRID_Y_OFFSET,
                    0
                );

                // Determine material type
                let materialType, instanceMesh, instanceIndex;
                if (random < 0.6) {
                    materialType = 'basalt';
                    instanceMesh = basaltInstances;
                    instanceIndex = basaltInstances.count++;
                } else if (random < 0.85) {
                    materialType = 'brightLava';
                    instanceMesh = brightLavaInstances;
                    instanceIndex = brightLavaInstances.count++;
                } else {
                    materialType = 'lavaEmissive';
                    instanceMesh = lavaEmissiveInstances;
                    instanceIndex = lavaEmissiveInstances.count++;
                }

                // Set initial position
                matrix.makeTranslation(position.x, position.y, position.z);
                instanceMesh.setMatrixAt(instanceIndex, matrix);

                // Store animation data
                cubeData.push({
                    materialType,
                    instanceIndex,
                    position: position.clone(),
                    rotation: new THREE.Vector3(0, 0, 0),
                    state: State.NORMAL,
                    rotationProgress: 0,
                    rotationDirection: 1,
                    rotationAxis: new THREE.Vector2(0, 0),
                });
            }
        }

        // Update matrices
        basaltInstances.instanceMatrix.needsUpdate = true;
        brightLavaInstances.instanceMatrix.needsUpdate = true;
        lavaEmissiveInstances.instanceMatrix.needsUpdate = true;

        // Store cube data
        cubeDataRef.current = cubeData;
    };

    const animate = (timestamp) => {
        const elapsed = timestamp - lastFrameTimeRef.current;

        if (elapsed >= frameInterval) {
            lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

            // Update animation state
            updateCubes();

            // Render scene
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }

        requestAnimationFrame(animate);
    };

    const updateCubes = () => {
        const cubes = cubeDataRef.current;
        const meshes = instancedMeshesRef.current;
        const matrix = matrixRef.current;
        const quaternion = quaternionRef.current;
        let needsUpdateBasalt = false;
        let needsUpdateBrightLava = false;
        let needsUpdateLavaEmissive = false;

        cubes.forEach((cube) => {
            // Existing state machine logic
            if (cube.state === State.NORMAL && Math.random() < 0.001) {
                startCubeRising(cube);
            }

            if (cube.state === State.RISING) {
                const targetZ = 2;
                cube.position.z += (targetZ - cube.position.z) * 0.1;

                if (Math.abs(cube.position.z - targetZ) < 0.05) {
                    cube.position.z = targetZ;
                    cube.state = State.ROTATING;
                }
            }

            if (cube.state === State.ROTATING) {
                const rotationSpeed = 0.15;

                cube.rotation.x += cube.rotationDirection * cube.rotationAxis.x * rotationSpeed;
                cube.rotation.y += cube.rotationDirection * cube.rotationAxis.y * rotationSpeed;
                cube.rotationProgress += rotationSpeed;

                if (cube.rotationProgress > Math.PI) {
                    cube.state = State.LOWERING;
                    cube.rotationProgress = 0;
                    cube.rotation.set(0, 0, 0);
                }
            }

            if (cube.state === State.LOWERING) {
                cube.position.z += (0 - cube.position.z) * 0.1;

                if (cube.position.z <= 0.05) {
                    cube.position.z = 0;
                    cube.state = State.NORMAL;
                }
            }

            // Update instance matrix
            quaternion.setFromEuler(new THREE.Euler(
                cube.rotation.x,
                cube.rotation.y,
                cube.rotation.z
            ));

            matrix.compose(
                cube.position,
                quaternion,
                new THREE.Vector3(1, 1, 1)
            );

            // Update the appropriate instanced mesh
            const instanceMesh = meshes[cube.materialType];
            instanceMesh.setMatrixAt(cube.instanceIndex, matrix);

            // Mark for update
            switch (cube.materialType) {
                case 'basalt':
                    needsUpdateBasalt = true;
                    break;
                case 'brightLava':
                    needsUpdateBrightLava = true;
                    break;
                case 'lavaEmissive':
                    needsUpdateLavaEmissive = true;
                    break;
            }
        });

        // Only update matrices that changed
        if (needsUpdateBasalt) {
            meshes.basalt.instanceMatrix.needsUpdate = true;
        }
        if (needsUpdateBrightLava) {
            meshes.brightLava.instanceMatrix.needsUpdate = true;
        }
        if (needsUpdateLavaEmissive) {
            meshes.lavaEmissive.instanceMatrix.needsUpdate = true;
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

    const disposeResources = () => {
        // Dispose instanced meshes
        const meshes = instancedMeshesRef.current;
        Object.values(meshes).forEach(mesh => {
            mesh.geometry.dispose();
            mesh.material.dispose();
        });

        rendererRef.current?.dispose();
    };

    return (
        <div ref={mountRef} className="fixed inset-0 w-screen h-screen z-0" />
    );
};

export default Background;
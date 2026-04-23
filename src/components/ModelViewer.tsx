import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelViewerProps {
    modelPath?: string;
    isTyping?: boolean;
}

const expressions = ['👀', '🤔', '💭', '✨', '👍', '😊', '🎯', '💡', '✏️', '📝'];

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath = '/modell.glb', isTyping = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const modelRef = useRef<THREE.Object3D | null>(null);
    const [currentExpression, setCurrentExpression] = useState('');

    // Random expressions when typing
    useEffect(() => {
        if (!isTyping) {
            setCurrentExpression('');
            return;
        }

        const showExpression = () => {
            const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
            setCurrentExpression(randomExpression);

            setTimeout(() => {
                setCurrentExpression('');
            }, 2000);
        };

        showExpression();
        const interval = setInterval(showExpression, 3000);

        return () => clearInterval(interval);
    }, [isTyping]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            50,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Renderer with performance optimizations
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const purpleLight = new THREE.PointLight(0x8b5cf6, 1, 100);
        purpleLight.position.set(-3, 3, 3);
        scene.add(purpleLight);

        const blueLight = new THREE.PointLight(0x3b82f6, 1, 100);
        blueLight.position.set(3, -3, 3);
        scene.add(blueLight);

        // Load model
        const loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf: any) => {
                const model = gltf.scene;
                modelRef.current = model;

                // Preserve original model colors, just enable shadows
                model.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);

                // Scale to fit - INCREASED SIZE
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3.5 / maxDim; // Increased from 2 to 3.5
                model.scale.setScalar(scale);

                scene.add(model);

                // Animation
                let targetRotation = 0;
                const animate = () => {
                    requestAnimationFrame(animate);

                    // Smooth rotation towards typing area when typing
                    if (isTyping) {
                        targetRotation = Math.PI / 6; // Turn right ~30 degrees
                    } else {
                        targetRotation = 0; // Face forward
                    }

                    // Smooth interpolation
                    model.rotation.y += (targetRotation - model.rotation.y) * 0.05;

                    renderer.render(scene, camera);
                };
                animate();
            },
            undefined,
            (error: any) => {
                console.error('Error loading model:', error);
                // Add fallback sphere if model fails to load
                const geometry = new THREE.IcosahedronGeometry(2.0, 1); // Increased from 1.5 to 2.0
                const material = new THREE.MeshStandardMaterial({
                    color: 0x8b5cf6,
                    wireframe: true,
                    emissive: 0x8b5cf6,
                    emissiveIntensity: 0.2
                });
                const mesh = new THREE.Mesh(geometry, material);
                modelRef.current = mesh;
                scene.add(mesh);

                let targetRotation = 0;
                const animate = () => {
                    requestAnimationFrame(animate);

                    // Smooth rotation towards typing area when typing
                    if (isTyping) {
                        targetRotation = Math.PI / 6; // Turn right ~30 degrees
                    } else {
                        targetRotation = 0; // Face forward
                    }

                    // Smooth interpolation
                    mesh.rotation.y += (targetRotation - mesh.rotation.y) * 0.05;
                    mesh.rotation.x += 0.003;

                    renderer.render(scene, camera);
                };
                animate();
            }
        );

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [modelPath, isTyping]);

    return (
        <div className="relative w-full h-full">
            <div ref={containerRef} className="w-full h-full" />

            {/* Floating expressions */}
            <AnimatePresence>
                {currentExpression && (
                    <motion.div
                        key={currentExpression}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: -20, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.5 }}
                        className="absolute top-10 right-10 text-6xl pointer-events-none"
                    >
                        {currentExpression}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

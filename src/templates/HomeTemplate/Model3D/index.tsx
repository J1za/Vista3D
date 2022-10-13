import { useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html, useProgress } from "@react-three/drei";
import { Suspense, useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';

const LoaderModel = () => {
    const { progress } = useProgress()
    return (
        <Html center> {progress} %<CircularProgress color="secondary" /></Html>
    )
}
const Scene = ({ model = 'Pia_fit_avg.glb' }) => {
    const { scene, nodes, materials } = useGLTF(model)
    const copiedScene = useMemo(() => scene.clone(), [scene])
    return <group>
        {/* <mesh receiveShadow castShadow material={materials.mat0} material-color='#000000' />
        <mesh receiveShadow castShadow material={materials.mat1} material-color='green' />
        <mesh receiveShadow castShadow material={materials.mat2} material-color='#ffffff' />
        <mesh receiveShadow castShadow material={materials.mat3} material-color='#ffffff' />
        <mesh receiveShadow castShadow material={materials.mat4} material-color='#ffffff' />
        <mesh receiveShadow castShadow material={materials.mat6} material-color='#ffffff' /> 
        <mesh receiveShadow castShadow material={materials.mat5} material-color='#000' />*/}
        <primitive position={[0, -1.5, 0]} object={copiedScene} materialColor='#000000' scale={0.017} />
    </group>;
};

export default function Model3D({ model = 'Pia_fit_avg.glb' }) {
    const [hovered, setHover] = useState(false)
    return (
        <div>
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 20 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Suspense fallback={<LoaderModel />}>
                    <color attach="background" args={['#0096FF']} />
                    <ambientLight />
                    <pointLight position={[-10, -10, 0]} intesity={2} />
                    <group>
                        <mesh
                            receiveShadow
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, -1.5, 0]}

                        >
                            <circleGeometry attach='geometry' args={[1.1, 32]} />
                            <meshBasicMaterial attach="material" color="orange" />
                        </mesh>
                    </group>
                    <Scene model={model} />
                    <spotLight
                        castShadow
                        intensity={1}
                        args={["blue", 1, 100]}
                        position={[-1, 1, 1]}
                    />
                    <OrbitControls enablePan={false} enableZoom={true} maxDistance={15} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} autoRotate={hovered ? false : true} autoRotateSpeed={3} />

                </Suspense>
            </Canvas>
        </div>
    );
}

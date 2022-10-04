import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX, PerspectiveCamera, Html, useProgress } from "@react-three/drei";
import { Suspense, useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';

const LoaderModel = () => {
    const { progress } = useProgress()
    return (
        <Html center> {progress} %<CircularProgress color="secondary" /></Html>
    )
}

const Scene = ({ model = 'Pia_Fit_avg.fbx' }) => {

    const fbx = useFBX(model);
    console.log(fbx)
    return <primitive position={[0, 0, -1.5]} object={fbx} scale={0.02} />;
};

export default function Model3D({ model = 'Pia_Fit_avg.fbx' }) {
    const [hovered, setHover] = useState(false)
    return (
        <div className='border-default'>
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 20 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <color attach="background" args={['#c0c0c0']} />
                <PerspectiveCamera rotation={[4.7, 0, 0]}>
                    <Suspense fallback={<LoaderModel />}>
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <Scene model={model} />
                        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.2} autoRotate={hovered ? false : true} autoRotateSpeed={3} />
                    </Suspense>
                </PerspectiveCamera>
            </Canvas>
        </div>
    );
}

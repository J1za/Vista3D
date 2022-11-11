import { useRef, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'

export default function UnityGame() {
    const router = useRouter()

    const { unityProvider, requestFullscreen, sendMessage, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: "game/app.loader.js",
        dataUrl: "https://firebasestorage.googleapis.com/v0/b/vista-3d-93953.appspot.com/o/app.data?alt=media&token=e556b6af-8d4a-443a-ae61-6a3e89221e6d",
        frameworkUrl: "game/app.framework.js",
        codeUrl: "game/app.wasm",
    });
    const canvasRef = useRef(null);
    function handleClick() {
        requestFullscreen(true);
    }
    function handleClickOne() {
        sendMessage("BG", "OnClickAddNumber", 2);
    }
    useEffect(() => {
        return () => {
            detachAndUnloadImmediate()
        }
    }, [detachAndUnloadImmediate])

    const loadingPercentage = Math.round(loadingProgression * 100);
    return (
        <div className={style.container}>
            {!isLoaded && (
                <Box component='div' className={style.loading} sx={{ display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" value={loadingPercentage} size={120} color='success' />
                    <Box
                        component='div'
                        sx={{
                            top: 5,
                            left: 5,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            color='#2e7d32'
                            variant="h4"
                            component="h4"
                        >{`${loadingPercentage}%`}</Typography>
                    </Box>
                </Box>
                // We'll conditionally render the loading overlay if the Unity
                // Application is not loaded.
            )}
            <Unity
                className={style.game}
                ref={canvasRef}
                unityProvider={unityProvider}
            />

            {/* <button onClick={handleClick}>Enter Fullscreen</button> */}
            {/* <button onClick={handleClickOne}>Add +1</button> */}
        </div>
    );
}

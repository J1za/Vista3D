import { useRef, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'

export default function UnityGame() {
    const router = useRouter()

    const { unityProvider, requestFullscreen, sendMessage, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "game/app.loader.js",
        dataUrl: "https://ucarecdn.com/ebe06d0c-f4f2-408e-8292-afdd6d538db6/app.data",
        frameworkUrl: "game/app.framework.js",
        codeUrl: "game/app.wasm",
    });
    const canvasRef = useRef(null);
    function handleClick() {
        requestFullscreen(true);
    }
    function handleClickOne() {
        sendMessage("Cloth Example", "OnClickLogoBtn");
    }
    // const handleSetScore = useCallback((score) => {
    //     console.log(score);
    // }, []);
    // useEffect(() => {
    //     addEventListener("OnClickLogoBtn", handleSetScore);
    //     return () => {
    //         removeEventListener("OnClickLogoBtn", handleSetScore);
    //     };
    // }, [addEventListener, removeEventListener, handleSetScore]);
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

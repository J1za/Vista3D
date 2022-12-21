import { useRef, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'
import Router from 'next/router'

export default function UnityGame() {
    const { unityProvider, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "https://ucarecdn.com/d0cb0340-d323-405f-9d61-4dabc859c76a/Buildloader.js",
        dataUrl: "https://ucarecdn.com/994e9e28-1c4b-491e-9ded-fc9b3a49bb85/Build.data",
        frameworkUrl: "https://ucarecdn.com/4a9ab156-1303-4a8c-9c31-06385292d74c/Buildframework.js",
        codeUrl: "https://ucarecdn.com/c4a09c78-a4ed-4b87-b854-16df299c15c3/Build.wasm",
    });
    const canvasRef = useRef(null);
    const handleSetScore = useCallback(() => {
        Router.push('/')
    }, []);
    useEffect(() => {
        addEventListener("RedirectToHomePage", handleSetScore);
        return () => {
            removeEventListener("RedirectToHomePage", handleSetScore);
        };
    }, [addEventListener, removeEventListener, handleSetScore]);

    //disable game when another page
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

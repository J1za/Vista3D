import { useRef, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'
import Router from 'next/router'

export default function UnityGame() {
    const { unityProvider, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "https://ucarecdn.com/cd9960d8-a8aa-4b91-8640-8f894f5fa874/B3loader.js",
        dataUrl: "https://ucarecdn.com/943475a6-41ea-4508-8754-d428fd96c667/B3.data",
        frameworkUrl: "https://ucarecdn.com/e4ddfd85-19ae-4de4-91f0-3b5db7025091/B3framework.js",
        codeUrl: "https://ucarecdn.com/fec39a74-2e1b-4486-9f34-be770c1ad696/B3.wasm",
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

import { useRef, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'
import Router from 'next/router'

export default function UnityGame() {
    const { unityProvider, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "https://ucarecdn.com/87f611e0-1cbe-48d5-bde0-79ccf22c75f1/Configuratorloader.js",
        dataUrl: "https://ucarecdn.com/1b0b3270-7d6b-4c21-ab74-eb0a7bffe03c/Configurator.data",
        frameworkUrl: "https://ucarecdn.com/ddd6d5af-cbde-4d19-ac5c-4376c8c2d306/Configuratorframework.js",
        codeUrl: "https://ucarecdn.com/1d08f1b2-363b-4435-bf52-85edd1b23c67/Configurator.wasm",
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

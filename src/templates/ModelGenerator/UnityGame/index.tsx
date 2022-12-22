import { useRef, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'
import Router from 'next/router'

export default function UnityGame() {
    const { unityProvider, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "https://ucarecdn.com/bf793a45-a2a0-48fd-bcf1-433cebf8ba0b/UPDATE_MEloader.js",
        dataUrl: "https://ucarecdn.com/02193f4d-680a-435d-bc82-9f07b212fc14/UPDATE_ME.data",
        frameworkUrl: "https://ucarecdn.com/a3fb121e-3b31-43a2-9b87-39e5d979b502/UPDATE_MEframework.js",
        codeUrl: "https://ucarecdn.com/b66438a3-3d2c-43c3-aa86-1879a6ba6d82/UPDATE_ME.wasm",
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

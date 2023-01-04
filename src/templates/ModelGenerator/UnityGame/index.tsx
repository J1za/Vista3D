import { useRef, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { CircularProgress, Box, Typography } from '@mui/material';
import style from './style.module.scss'
import Router from 'next/router'

export default function UnityGame() {
    const { unityProvider, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate, loadingProgression, isLoaded, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "https://ucarecdn.com/ffea29dd-75d8-4491-bf0e-cc1beec26a25/Build_04012023loader.js",
        dataUrl: "https://ucarecdn.com/7d39f9a1-0d6e-4088-97e7-597d3e0cbfed/Build_04012023.data",
        frameworkUrl: "https://ucarecdn.com/d8c6d42a-4e2d-4dbc-b961-0fb0db80b886/Build_04012023framework.js",
        codeUrl: "https://ucarecdn.com/9aa1fbba-91b1-45e1-a418-42f81acf4644/Build_04012023.wasm",
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

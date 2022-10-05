import * as React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGame() {
    const { unityProvider, requestFullscreen, addEventListener, sendMessage } = useUnityContext({
        loaderUrl: "game/app.loader.js",
        dataUrl: "game/app.data",
        frameworkUrl: "game/app.framework.js",
        codeUrl: "game/app.wasm",
    });
    const canvasRef = React.useRef(null);
    function handleClick() {
        requestFullscreen(true);
    }
    function handleClickOne() {
        sendMessage("BG", "OnClickAddNumber", 2);
    }
    return (
        <>
            <Unity
                ref={canvasRef}
                unityProvider={unityProvider}
                style={{
                    width: '100%',
                    height: '97%',
                    cursor: 'pointer'
                }}
            />

            <button onClick={handleClick}>Enter Fullscreen</button>
            <button onClick={handleClickOne}>Add +1</button>
        </>
    );
}

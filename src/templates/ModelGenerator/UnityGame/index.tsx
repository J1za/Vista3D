import { useRef, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter } from 'next/router'

export default function UnityGame() {
    const router = useRouter()

    const { unityProvider, requestFullscreen, sendMessage, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate } = useUnityContext({
        loaderUrl: "game/app.loader.js",
        dataUrl: "game/app.data",
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
    // async function handleClickBack() {
    //     await unload();
    //     // Ready to navigate to another page.
    // }
    useEffect(() => {
        return () => {
            detachAndUnloadImmediate()
        }
    }, [detachAndUnloadImmediate])

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

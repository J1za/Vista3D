import { useRef, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter } from 'next/router'

export default function UnityGame() {
    const router = useRouter()

    const { unityProvider, requestFullscreen, sendMessage, UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate } = useUnityContext({
        loaderUrl: "game/app.loader.js",
        dataUrl: "https://media.githubusercontent.com/media/J1za/Vista3D/master/public/game/app.data?token=ADU5SOZZVW4HFHOCKS3CRVTDKLI5Y",
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

    return (
        <>
            <Unity
                ref={canvasRef}
                unityProvider={unityProvider}
                style={{
                    width: '100%',
                    height: '100vh'
                }}
            />


            {/* <button onClick={handleClick}>Enter Fullscreen</button> */}
            {/* <button onClick={handleClickOne}>Add +1</button> */}
        </>
    );
}

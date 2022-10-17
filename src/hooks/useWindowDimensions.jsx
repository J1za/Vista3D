import { useState, useEffect } from 'react'

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    const isDesktop = width >= 1680;
    const isDesktopSmall = width <= 1439;
    const isLaptop = width <= 1199;
    const isLaptopSmall = width <= 1024;
    const isTable = width <= 768;
    const isMobile = width <= 639;
    return {
        width,
        height,

        isDesktop,
        isDesktopSmall,
        isLaptop,
        isLaptopSmall,
        isTable,
        isMobile
    }
}

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions(),
    )

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}

export default useWindowDimensions
import { useState, useEffect } from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)"); // Tailwind's "sm" breakpoint

        const handleResize = () => setIsMobile(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleResize);
        handleResize(); // Set initial value

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return isMobile;
}
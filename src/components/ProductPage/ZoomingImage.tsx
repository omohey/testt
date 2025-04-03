import Image from "next/image";
import { useRef, useState } from "react";

type TZoomingImage = {
    src: string;
    alt: string;
    zoomScale?: number;
    zoomSize?: number;
}

const ZoomingImage = ({ src, alt, zoomScale = 3, zoomSize = 0.5 }: TZoomingImage) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, containerX: 0, containerY: 0, visible: false });
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imgRef.current) return;

        // position on normal image in px
        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = (e.clientX - left);
        const y = (e.clientY - top);

        // same position on zoomed in image in px
        const zoomedX = x * zoomScale * zoomSize;
        const zoomedY = y * zoomScale * zoomSize;


        setZoomPosition({
            x: width * zoomSize / 2 - zoomedX, // center of zoomed image - position on zoomed image
            y: height * zoomSize / 2 - zoomedY,
            containerX: x,
            containerY: y,
            visible: true
        });
    };

    const handleMouseLeave = () => {
        setZoomPosition((prev) => ({ ...prev, visible: false }));
    };

    return (
        <div className='w-full aspect-square relative'>
            {isImageLoading && (
                <div className="absolute inset-0 shimmer" />
            )}
            <Image
                loading="lazy"
                src={src}
                alt={alt}
                className={`w-full aspect-square object-contain`}
                onLoad={() => setIsImageLoading(false)}
                fill
                ref={imgRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            <div
                className={`absolute aspect-square  shadow-lg pointer-events-none z-10 -translate-1/2 bg-no-repeat rounded-full ${zoomPosition.visible ? "scale-100" : "scale-0"} transition-transform duration-300`}
                style={{
                    top: `${zoomPosition.containerY}px`,
                    left: `${zoomPosition.containerX}px`,
                    backgroundImage: `url(${src})`,
                    backgroundSize: `${zoomScale * 100}%`,
                    backgroundPosition: `${zoomPosition.x}px ${zoomPosition.y}px`,
                    width: `${zoomSize * 100}%`,
                }}
            />
        </div>)
}

export default ZoomingImage;
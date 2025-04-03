import Image from "next/image";
import { useState } from "react";
import '@/app/globals.css';

const ImageThumbnail = ({ src, alt, isActive, onClick }: { src: string, alt: string; isActive: boolean; onClick: () => void }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <button className="aspect-video" onClick={onClick}>
            {isImageLoading && (
                <div className="absolute inset-0 shimmer" />
            )}
            <Image
                loading="lazy"
                src={src}
                alt={alt}
                className={`aspect-video object-cover rounded-xl static-position ${isActive ?
                    "border-[#b58c64] border-2 shadow-lg"
                    : ""}`}
                onLoad={() => setIsImageLoading(false)}
                fill
            />
        </button>
    )
}

export default ImageThumbnail;
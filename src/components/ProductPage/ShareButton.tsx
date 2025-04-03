import { translations } from "@/translations";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiMail, CiShare2 } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialFacebook } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

const ShareButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // onClick outside to close the share button
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (isOpen && shareRef.current && !shareRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        setCurrentUrl(encodeURIComponent(window.location.href));
    }, []);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${currentUrl}`,
        whatsapp: `https://wa.me/?text=${currentUrl}`,
        email: `mailto:?subject=Check this out&body=${currentUrl}`,
    };

    return (
        <div className="flex justify-center items-center relative">
            <button
                className="w-10 h-10 rounded-full border-1 border-[#e5e7eb] flex items-center justify-center bg-white shadow-lg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <IoMdClose className="w-6 h-6 text-gray-600" />)
                    : (<CiShare2 className="w-6 h-6 text-gray-600" />)}
            </button>

            <div
                ref={shareRef}
                className={`${isOpen ? `max-h-[200px] p-2 ${copied ? "overflow-visible" : ""}` : "max-h-0 pointer-events-none p-0"}  absolute -bottom-2 translate-y-full flex flex-col items-center bg-white rounded-full shadow-lg space-y-3 transition-all duration-300 ease-in-out overflow-hidden`}
            >
                {/* Facebook */}
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <SlSocialFacebook className="w-6 h-6 text-black" />
                </a>

                {/* Twitter */}
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <RiTwitterXFill className="w-6 h-6 text-black" />
                </a>

                {/* WhatsApp */}
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                    <PiWhatsappLogoLight className="w-6 h-6 text-black" />
                </a>

                {/* Email */}
                <a href={shareLinks.email} target="_blank" rel="noopener noreferrer">
                    <CiMail className="w-6 h-6 text-black" />
                </a>

                {/* Copy Link */}
                <button className='relative flex items-center'
                    onClick={handleCopy}
                >
                    <IoIosLink className="w-6 h-6 text-black" />
                    {copied && (
                        <span className='absolute -right-3 translate-x-full bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity duration-300 rtl:-left-3 rtl:-translate-x-full'>
                            {translations['en']['copied']}
                        </span>)}
                </button>
            </div>
        </div>
    );
};

export default ShareButton;
import { useState, useRef, useEffect } from "react";
import {
    FaShareAlt,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
} from "react-icons/fa";

interface ShareIconsOnlyProps {
    score?: number;
    levelTitle?: string;
    levelNumber?: string | number;
}

const ShareIconsOnly = ({ score = 0, levelTitle = "Brain Boost", levelNumber }: ShareIconsOnlyProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const websiteUrl = "https://guhuza.com/";

    const message = `I just scored ${score} point${score !== 1 ? "s" : ""} on Guhuza's ${levelTitle} quiz! 💡🔥`;
    const fullText = levelNumber
        ? `${message} (Level ${levelNumber}) – Try it now:`
        : `${message} Try it now:`;

    const encodedText = encodeURIComponent(fullText);
    const encodedURL = encodeURIComponent(websiteUrl);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 quizSbtn"
            >
                <FaShareAlt /> Share
            </button>

            {isOpen && (
                <div
                    ref={popupRef}
                    className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 z-10"
                >
                    <div className="flex gap-4 justify-center">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&quote=${encodedText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 text-xl hover:opacity-80"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-xl hover:opacity-80"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}&summary=${encodedText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-xl hover:opacity-80"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodedText} ${websiteUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 text-xl hover:opacity-80"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareIconsOnly;

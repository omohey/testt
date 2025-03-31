import { COLUMNS_IMAGES } from '@/config';
import { translations } from '@/translations';
import { useState } from 'react';


const GridModeButtons = ({ setNumberColumns, numberColumns, isArabic }: { setNumberColumns: (number: number) => void; numberColumns: number; isArabic?: boolean }) => {
    const [isHovered, setIsHovered] = useState(COLUMNS_IMAGES.map(() => false));

    return (
        <div className='flex gap-4'>
            {COLUMNS_IMAGES.map((item, index) => {
                const Icon = item.image;
                return (
                    <div key={item.columns} className={`relative ${item.columns === 5 ? "hidden sm:block" : ""}`}>
                        <button

                            onClick={() => {
                                setNumberColumns(item.columns);
                                setIsHovered((prev) => prev.map(() => false));
                            }}
                            onMouseEnter={() => setIsHovered((prev) => prev.map((_, i) => i === index))}
                            onMouseLeave={() => setIsHovered((prev) => prev.map((_, i) => i === index ? false : prev[i]))}
                        >
                            <Icon color={item.columns === numberColumns || isHovered[index] ? "#000" : "#C0C0C0"} />
                        </button>
                        {isHovered[index] && <span className="bg-black rounded px-[15px] py-[7px] max-w-[360px] z-[100] absolute text-left text-white mb-[5px] bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">{item.columns} {translations[isArabic ? "ar" : "en"]['columns']}</span>}
                    </div>
                )
            })
            }
        </div >
    );
}

export default GridModeButtons;
"use client";
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { TProduct } from '@/types/Product';
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { NavigationOptions } from 'swiper/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FiMinus, FiPlus } from 'react-icons/fi';

import clsx from 'clsx';
import { translations } from '@/translations';
import './Transitions.css';
import Image from 'next/image';

export enum ProductBoxVariant {
    LIST = "list",
    GRID = "grid",
    QUICK_VIEW = "quick_view"
}

type TProps = {
    data: TProduct & { category?: string };
    isArabic?: boolean;
    variant: ProductBoxVariant;
    currency: string
    onAddToCartClick: (productId: string, count?: number) => void;
    onAddToWishlistClick: (productId: string) => void;
    onQuickViewClick?: (productId: TProduct) => void;
};

const ProductBox = ({ data, isArabic, variant, currency, onAddToCartClick, onAddToWishlistClick, onQuickViewClick }: TProps) => {
    const { images, name: englishName, arabicName, price, href, tags, inStock, category } = data;

    const [currentImage, setCurrentImage] = useState(images[0]);
    const name = isArabic ? arabicName : englishName;
    return variant === ProductBoxVariant.QUICK_VIEW ? <QuickViewProductBox data={data} isArabic={isArabic} variant={variant} currency={currency} onAddToCartClick={onAddToCartClick} onAddToWishlistClick={onAddToWishlistClick} />
        : (
            <Link href={href ?? ""}
                onClick={(e) => {
                    if (!href) {
                        e.preventDefault();
                    }
                }}
                className={`flex flex-col ${variant === ProductBoxVariant.LIST ? "w-full sm:flex-row sm:gap-7 border-b-1 border-[#eee] py-5 last-of-type:border-0" : ""}`}
            >
                <div
                    className={`w-full overflow-hidden relative group ${variant === ProductBoxVariant.LIST ? "sm:max-w-[300px]" : ""}`}
                    onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
                    onMouseLeave={() => setCurrentImage(images[0])}
                >
                    <ProductImage src={currentImage} alt={name} imageClassName='hover:transform hover:scale-105 transition-transform duration-300' />
                    {variant === ProductBoxVariant.GRID &&
                        <div className='absolute bottom-0 left-0 right-0 w-full flex justify-center pb-2 gap-[4px] px-1 sm:[position:unset]'>
                            <button className='w-9 h-9 min-w-0 rounded-full bg-white flex justify-center items-center cursor-pointer hover:not-disabled:bg-black hover:not-disabled:text-white transition-colors duration-300 sm:hidden sm:absolute sm:bottom-4 sm:group-hover:flex sm:w-11/12 sm:h-fit disabled:opacity-50 disabled:cursor-not-allowed'
                                onClick={(e) => { e.preventDefault(); onAddToCartClick(data.id, 1); }} disabled={!inStock}>
                                <FiShoppingBag size={14} className='sm:hidden' />
                                <p className='text-xs py-2 hidden sm:block'>
                                    {translations[isArabic ? "ar" : "en"]['add-to-cart']}
                                </p>
                            </button>
                            <button className='w-9 h-9 min-w-0 rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 sm:hidden sm:absolute sm:top-2 sm:right-2 sm:group-hover:flex' onClick={(e) => { e.preventDefault(); onAddToWishlistClick(data.id) }}>
                                <FaRegHeart size={14} />
                            </button>
                            <button className='w-9 h-9 min-w-0 rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 sm:hidden sm:absolute sm:top-14 sm:right-2 sm:group-hover:flex' onClick={(e) => { e.preventDefault(); onQuickViewClick?.(data) }}>
                                <MdOutlineRemoveRedEye size={14} />
                            </button>
                        </div>
                    }
                </div>
                <div className={`${variant === ProductBoxVariant.LIST ? "sm:min-w-xs" : ""} sm:py-0 pt-5 flex flex-col gap-4`}>
                    <div className={`${variant === ProductBoxVariant.LIST ? "sm:min-w-xs" : ""}`}>
                        {category && <p className={`text-[14px] text-[#999] ${variant === ProductBoxVariant.LIST ? "text-[20px]" : ""}`}>{category}</p>}
                        <p className={`text-[14px] text-[#222] ${variant === ProductBoxVariant.LIST ? "text-[20px]" : ""}`}>{name}</p>
                        <p className={`text-[14px] text-[#555] ${variant === ProductBoxVariant.LIST ? "text-[20px]" : ""}`}>{price.toFixed(2)} {currency}</p>
                        {tags && tags.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full font-medium"
                                    >
                                        {isArabic ? tag.titleAr : tag.title}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {variant === ProductBoxVariant.LIST && <div className='flex gap-4 items-center '>
                        <button
                            className='bg-[#333] text-white py-3 px-10 rounded-4xl hover:opacity-50 active:opacity-50 w-fit disabled:opacity-50 disabled:cursor-not-allowed text-[12px] uppercase'
                            onClick={(e) => { e.preventDefault(); onAddToCartClick(data.id, 1); }}
                            disabled={!inStock}
                        >
                            {translations[isArabic ? "ar" : "en"]['add-to-cart']}
                        </button>

                        <div className='relative group'>
                            <button className='w-10 h-10 min-w-0 rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 border-1 border-[#eee] active:bg-black active:text-white' onClick={(e) => {
                                e.preventDefault(); onAddToWishlistClick(data.id);
                            }}>
                                <FaRegHeart size={14} />
                            </button>
                            <span className="bg-black rounded py-[4px] px-[8px] z-[10] absolute text-left text-white mb-[5px] bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block text-xs">Add to wishlist</span>
                        </div>
                    </div>}
                </div>
            </Link>
        )
}

const QuickViewProductBox = ({ data, isArabic = false, currency, onAddToCartClick }: TProps) => {
    const { images, name: englishName, arabicName, price, tags, productQuantity, inStock } = data;

    const [numberOfItems, setNumberOfItems] = useState<number>(Number(!!inStock));

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);

    const handleSwiperState = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }

    const name = isArabic ? arabicName : englishName;
    return (
        <div
            className={`flex flex-col w-full sm:flex-row sm:gap-7`}
        >
            <div
                className={`w-full overflow-hidden relative sm:max-w-[300px] sm:min-w-[150px]`}
            >
                <button
                    className={clsx("bg-gray-200 w-10 h-10 p-2 rounded-full  justify-center items-center absolute top-1/2 left-2 z-5 -translate-y-1/2", { "hidden": isBeginning })}
                    disabled={isBeginning}
                    ref={navigationPrevRef}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className='text-gray-500 rtl:-rotate-180 w-4 !h-4' />
                </button>
                <button
                    className={clsx("bg-gray-200 w-10 h-10 p-2 rounded-full justify-center items-center absolute top-1/2 right-2 z-5 -translate-y-1/2", { ["hidden"]: isEnd })}
                    disabled={isEnd}
                    ref={navigationNextRef}
                >
                    <FontAwesomeIcon icon={faArrowRight} className='text-gray-500 rtl:-rotate-180 w-4 !h-4' />
                </button>
                <Swiper
                    slidesPerView={1}
                    allowTouchMove
                    modules={[Navigation]}
                    onInit={handleSwiperState}
                    onReachEnd={handleSwiperState}
                    onReachBeginning={handleSwiperState}
                    onSlideChange={handleSwiperState}
                    onSliderMove={handleSwiperState}
                    onNavigationPrev={handleSwiperState}
                    onNavigationNext={handleSwiperState}
                    onBeforeInit={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                        if (swiper.params.navigation) {
                            (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
                            (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                    navigation={{
                        nextEl: navigationNextRef.current,
                        prevEl: navigationPrevRef.current,
                    }}>
                    {images.map((image, index) => image && (
                        <SwiperSlide key={index}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image} alt={data.name} className='w-full object-contain aspect-square' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={`sm:min-w-xs sm:py-0 pt-5 flex flex-col justify-between gap-4`}>
                <div>
                    <p className={`text-black text-[22px]`}>{price.toFixed(2)} {currency}</p>
                    <p className={`text-[#222] text-[26px] sm:text-[30px]`}>{name}</p>
                    {tags && tags.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full font-medium"
                                >
                                    {isArabic ? tag.titleAr : tag.title}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex w-full gap-4'>
                        <div className='flex gap-4 bg-[#f5f5f5] justify-center items-center flex-2/6 rounded-4xl' >
                            <button onClick={() => {
                                if (numberOfItems === 1) return;
                                setNumberOfItems(numberOfItems - 1)
                            }}>
                                <FiMinus size={12} />
                            </button>
                            <span>{numberOfItems}</span>
                            <button onClick={() => {
                                if (numberOfItems >= Number(productQuantity)) return;
                                setNumberOfItems(numberOfItems + 1)
                            }}>
                                <FiPlus size={12} />
                            </button>
                        </div>
                        <button
                            className='bg-black text-white py-2 px-10 rounded-3xl hover:opacity-50 active:opacity-50 flex-4/6 disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={() => onAddToCartClick(data.id, numberOfItems)}
                            disabled={!inStock}
                        >
                            {translations[isArabic ? "ar" : "en"]['add-to-cart']}
                        </button>
                    </div>

                    <p className='text-[#999] text-[14px]'>{`${translations[isArabic ? "ar" : "en"]['availability']}: `}<span className='text-black'>{inStock ? translations[isArabic ? "ar" : "en"]['in-stock'] : translations[isArabic ? "ar" : "en"]['sold-out']}</span></p>
                </div>
            </div>
        </div>
    )
}


export default ProductBox


const ProductImage = ({ src, alt, imageClassName = "" }: { src: string, alt: string; imageClassName?: string }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <div className='w-full aspect-square'>
            {isImageLoading && (
                <div className="absolute inset-0 shimmer" />
            )}
            <Image
                loading="lazy"
                src={src}
                alt={alt}
                className={`w-full aspect-square object-contain ${imageClassName}`}
                onLoad={() => setIsImageLoading(false)}
                fill
            />
        </div>
    )
}
"use client";

import { translations } from '@/translations';
import { TCategory } from '@/types/Categories';
import { TProduct } from '@/types/Product';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { NavigationOptions } from 'swiper/types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./ListingPage/Transitions.css"
import { FaRegHeart } from "react-icons/fa";

import ZoomingImage from './ProductPage/ZoomingImage';
import BuyNowIcon from './ProductPage/BuyNowIcon';
import ImageThumbnail from './ProductPage/ImageThumbnail';
import ShareButton from './ProductPage/ShareButton';

const SLIDES_PER_VIEW = 3.5;

type TProps = {
    product: TProduct;
    categories: TCategory[];
    currency: string;
    onAddToCartClick: (productId: string, count?: number) => void;
    onAddToWishlistClick: (productId: string) => void;
    onBuyNowClick: (productId: string, count?: number) => void;
    isArabic?: boolean;
}

const ProductPage = ({
    product,
    categories,
    currency,
    onAddToCartClick,
    onAddToWishlistClick,
    onBuyNowClick,
    isArabic
}: TProps) => {
    const { tags, price, name: englishName, arabicName, inStock, productQuantity, id, description, images } = product;

    const name = isArabic ? arabicName : englishName;

    const [numberOfItems, setNumberOfItems] = useState<number>(Number(!!inStock));
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
    const [isDescriptionOverflow, setIsDescriptionOverflow] = useState<boolean>(false);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [notes, setNotes] = useState<string>("");

    // Swiper states
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const [activeImage, setActiveImage] = useState<number>(0);
    const swiperRef = useRef<SwiperClass>(null);

    const handleSwiperState = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        setActiveImage(swiper.activeIndex);
    }

    // to see if read more button should be shown -> text should overflow
    useEffect(() => {
        if (descriptionRef.current && descriptionRef.current.scrollHeight && descriptionRef.current.clientHeight) {
            setIsDescriptionOverflow(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, [description]);

    const productCategory = useMemo(() =>
        (categories.find((category) => category.id === product.categoryId)?.[isArabic ? "titleAr" : "title"]) || "",
        [categories, product.categoryId, isArabic]);

    const renderMainImage = useCallback(() => (
        <div
            className={`w-full overflow-hidden relative sm:min-w-[150px]`}
        >
            <button
                className={clsx("bg-gray-200 w-10 h-10 p-2 rounded-full justify-center items-center absolute top-1/2 start-2 z-5 -translate-y-1/2", { "hidden": isBeginning })}
                disabled={isBeginning}
                ref={navigationPrevRef}
            >
                <FontAwesomeIcon icon={faArrowLeft} className='text-gray-500 rtl:-rotate-180 w-4 !h-4' />
            </button>
            <button
                className={clsx("bg-gray-200 w-10 h-10 p-2 rounded-full justify-center items-center absolute top-1/2 end-2 z-5 -translate-y-1/2", { ["hidden"]: isEnd })}
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
                    // set the swiper reference
                    swiperRef.current = swiper;
                }}
                navigation={{
                    nextEl: navigationNextRef.current,
                    prevEl: navigationPrevRef.current,
                }}>
                {images.map((image, index) => image && (
                    <SwiperSlide key={index}>
                        <ZoomingImage src={image} alt={name} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className='w-9 h-9 rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 sm:hidden absolute bottom-2 right-2 z-1' onClick={() => onAddToWishlistClick(id)}>
                <FaRegHeart size={14} />
            </button>
        </div>
    ), [images, name, isBeginning, isEnd, onAddToWishlistClick, id]);

    const renderImageThumbnails = useCallback(() => (
        <div className='w-full'>
            <Swiper
                slidesPerView={SLIDES_PER_VIEW}
                allowTouchMove
                spaceBetween={10}
            >
                {images.map((image, index) => image && (
                    <SwiperSlide key={image} style={{
                        maxWidth: `calc(100% / ${SLIDES_PER_VIEW} - 10px)`,
                    }}>
                        <ImageThumbnail src={image} alt={name} isActive={activeImage === index} onClick={
                            () => {
                                setActiveImage(index);
                                if (swiperRef.current) {
                                    swiperRef.current.slideTo(index);
                                }
                            }
                        } />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    ), [images, name, activeImage]);

    const renderProductInformation = useCallback(() => (
        <div>
            <p className={`text-[#222] text-[20px] mb-6 sm:text-[24px]`}>{name}</p>
            {productCategory && <p className={`text-[14px] text-[#999] mb-[10px]`}>{productCategory}</p>}
            <p className={`text-[#991b1b] text-[20px]`}>{price.toFixed(2)} {currency}</p>
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
            {description && <div className='py-4 px-4'>
                <div
                    ref={descriptionRef}
                    className='overflow-hidden overflow-ellipsis'
                    style={{ "WebkitLineClamp": isDescriptionExpanded ? "none" : 3, "WebkitBoxOrient": "vertical", display: "-webkit-box" }}
                    dangerouslySetInnerHTML={{ __html: description }} />
                {isDescriptionOverflow && <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className='text-[#991b1b] mt-2'>
                    {isDescriptionExpanded ? translations[isArabic ? "ar" : "en"]['show-less'] : translations[isArabic ? "ar" : "en"]['show-more']}
                </button>}

                <div className='flex gap-6 mt-4'>
                    <ShareButton />
                    <button className='w-10 h-10 rounded-full bg-white hidden sm:flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 border-1 border-[#e5e7eb]' onClick={() => onAddToWishlistClick(id)}>
                        <FaRegHeart size={14} />
                    </button>
                </div>
            </div>}
            {/* TODO Share button */}
        </div>), [description, isDescriptionExpanded, isDescriptionOverflow, name, productCategory, tags, price, currency, isArabic, id, onAddToWishlistClick]);

    const renderFooter = useCallback((isInPriceContainer: boolean) => (
        <div className={`flex flex-col gap-4 sticky bottom-0 right-0 left-0 w-full p-3 bg-white sm:static sm:p-0 ${isInPriceContainer ? "hidden sm:flex" : "sm:hidden"}`}>
            <div className='flex justify-between items-center w-full'>
                <p className='text-[#222] text-[14px] hidden sm:block'>{translations[isArabic ? "ar" : "en"]['quantity']}</p>
                <div className='flex justify-between items-center border-[#e5e7eb] border-1 rounded-md w-full sm:w-auto' >
                    <button onClick={() => {
                        if (numberOfItems >= Number(productQuantity)) return;
                        setNumberOfItems(numberOfItems + 1)
                    }}
                        className='flex justify-center items-center min-w-10'
                    >
                        <FiPlus size={12} />
                    </button>
                    <span className='border-[#e5e7eb] border-1 border-y-0 p-2 flex-1 justify-center items-center text-center min-w-12'>{numberOfItems}</span>
                    <button onClick={() => {
                        if (numberOfItems === 1) return;
                        setNumberOfItems(numberOfItems - 1)
                    }}
                        className='flex justify-center items-center min-w-10'

                    >
                        <FiMinus size={12} />
                    </button>
                </div>
            </div>
            <div className='flex gap-2'>
                <button
                    className='bg-[#b58c64] text-[14px] py-2 rounded-xl hover:opacity-50 active:opacity-50 flex-1/2 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => onAddToCartClick(id, numberOfItems)}
                    disabled={!inStock}
                >
                    {translations[isArabic ? "ar" : "en"]['add-to-cart']}
                </button>
                <button
                    className='text-[#b58c64] py-2 rounded-xl hover:opacity-50 active:opacity-50 flex-1/2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-1 border-[#b58c64] sm:hidden'
                    onClick={() => { onBuyNowClick(id, numberOfItems) }}
                    disabled={!inStock}
                >
                    <BuyNowIcon />
                    {translations[isArabic ? "ar" : "en"]['buy-now']}
                </button>
            </div>
        </div>
    ), [numberOfItems, inStock, productQuantity, id, onAddToCartClick, onBuyNowClick, isArabic]);

    const renderNotesAndPrice = useCallback(() => (
        <>
            <div className='w-full bg-white rounded-md p-5'>
                <p className='text-[#222] text-[14px]'>{translations[isArabic ? "ar" : "en"]['add-note']}</p>
                <textarea
                    className='w-full h-20 border-2 border-[#f5f5f5] rounded-md p-2 mt-4 bg-[#f9fafb] focus:outline-[#b58c64] focus:outline-1'
                    placeholder={translations[isArabic ? "ar" : "en"]['add-note']}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <div className='w-full bg-white rounded-md p-5 flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-[#222] text-[14px] '>{translations[isArabic ? "ar" : "en"]['price']}</p>
                    <p className={`text-[#991b1b] text-[18px]`}>{price.toFixed(2)} {currency}</p>
                </div>
                {renderFooter(true)}
            </div>
        </>
    ), [notes, price, currency, isArabic, renderFooter]);

    return (
        <div className='bg-[#f9fafb] px-[10px] py-4'>
            <div className={`flex flex-col gap-4 sm:flex-row`}>
                <div className='flex flex-col w-full gap-4 sm:w-1/2'>
                    {/* Product Image */}
                    {renderMainImage()}

                    {/* Product Image Thumbnails */}
                    {renderImageThumbnails()}
                </div>

                <div className='flex flex-col gap-4 w-full sm:w-auto sm:max-w-1/2 sm:flex-1'>
                    {/* Product Info */}
                    {renderProductInformation()}

                    {/* Notes and Price */}
                    {renderNotesAndPrice()}
                </div>
                {renderFooter(false)}
            </div>
        </div >
    )
}

export default ProductPage
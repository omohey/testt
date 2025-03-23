"use client";

import React, { useRef, useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import ReviewItem, { ReviewsVariant, TReviewItem } from './Review';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NavigationOptions } from 'swiper/types';

type TProps = {
    title: string;
    reviews: Array<Omit<TReviewItem, "variant" | "primaryColor" | "bgColor" | "textColor">>;
    allowTouch?: boolean;
    isArabic?: boolean;
    variant?: ReviewsVariant;
    moduleStyles?: {
        primaryColor?: string;
        bgColor?: string;
        textColor?: string;
    }
};

const ReviewsCarousel = ({ title, allowTouch = false, isArabic, reviews, variant = ReviewsVariant.VERTICAL, moduleStyles = { primaryColor: "#152043", bgColor: "#DCDEE7" } }: TProps) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);

    const handleSwiperState = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    }

    return (
        <div className='flex w-full flex-col gap-4' {...(isArabic ? { dir: "rtl" } : {})}>
            <div className='flex justify-between items-center'>
                <h3 className='text-2xl font-bold' style={{ color: moduleStyles?.primaryColor }}>{title}</h3>
                <div className='flex gap-2'>
                    <button
                        className={clsx("bg-gray-200 w-12 h-12 p-2 rounded-full flex justify-center items-center", { "opacity-50 cursor-not-allowed": isBeginning })}
                        disabled={isBeginning}
                        ref={navigationPrevRef}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className='text-gray-500 rtl:-rotate-180 w-4 !h-4' />
                    </button>

                    <button
                        className={clsx("bg-gray-200 w-12 h-12 p-2 rounded-full flex justify-center items-center", { "opacity-50 cursor-not-allowed": isEnd })}
                        disabled={isEnd}
                        ref={navigationNextRef}
                    >
                        <FontAwesomeIcon icon={faArrowRight} className='text-gray-500 rtl:-rotate-180 w-4 !h-4' />
                    </button>
                </div>
            </div>

            <div className='w-full'>
                <Swiper
                    slidesPerView="auto"
                    allowTouchMove={allowTouch}
                    modules={[Navigation]}
                    onNavigationNext={handleSwiperState}
                    onNavigationPrev={handleSwiperState}
                    onSlideChange={handleSwiperState}
                    onInit={handleSwiperState}
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
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index} className='!w-fit'>
                            <ReviewItem variant={variant} {...moduleStyles} {...review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    )
}

export default ReviewsCarousel

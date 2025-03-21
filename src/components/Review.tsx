import clsx from "clsx";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const MAX_STARS = 5;

export enum ReviewsVariant {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export type TReviewItem = {
  reviewText: string;
  rating: number;
  name: string;
  imgSrc: string;
  imgAlt?: string;
  primaryColor?: string;
  bgColor?: string;
  variant?: ReviewsVariant;
  textColor?: string;
};

const ReviewItem = ({
  reviewText,
  rating,
  name,
  imgSrc,
  imgAlt,
  primaryColor,
  bgColor,
  variant = ReviewsVariant.VERTICAL,
  textColor,
}: TReviewItem) => {
  return (
    <div
      className={clsx(`flex max-w-[400px] min-w-[200px] justify-center items-center rounded-2xl px-4 py-6 relative gap-2 mx-2`, {
        ["flex-col pt-[50px] mt-[50px]"]: variant === ReviewsVariant.VERTICAL,
      })}
      style={{ backgroundColor: bgColor, color: primaryColor }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" src={imgSrc} alt={imgAlt ?? "Profile"} className={clsx("w-[80px] h-[80px] rounded-full",
        { ["absolute top-[-40px] right-1/2 translate-x-1/2"]: variant === ReviewsVariant.VERTICAL })} />

      <div className="flex flex-col justify-center items-center gap-2">
        <h5 className="text-2xl font-bold">{name}</h5>
        <FontAwesomeIcon icon={faQuoteLeft} className="w-10 !h-10" style={{ color: primaryColor }} />
        <p className="text-sm text-center text-neutral-500" style={{ ...(textColor ? { color: textColor } : {}) }}>
          {reviewText}
        </p>
        <RatingStars rating={rating} />
      </div >
    </div>
  );
};

export default ReviewItem;


const RatingStars = ({ rating }: { rating: number }) => {

  return (
    <div className="flex space-x-1 text-yellow-500">
      {[...Array(MAX_STARS)].map((_, index) => {
        if (index < Math.floor(rating)) {
          return <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500 w-4 h-4" />;
        } else if (index < rating) {
          return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="text-yellow-500 w-4 h-4" />;
        } else {
          return <FontAwesomeIcon key={index} icon={faStar} className="text-gray-500 w-4 h-4" />;
        }
      })}
    </div>
  );
};
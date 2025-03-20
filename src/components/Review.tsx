import clsx from "clsx";
import React from "react";

enum ReviewsVariant {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

type TProps = {
  fontColor: string;
  bgColor: string;
  variant: ReviewsVariant;
};
const Review = ({
  fontColor,
  bgColor,
  variant = ReviewsVariant.VERTICAL,
}: TProps) => {
  return (
    <div
      className={clsx("flex flex-col", {
        ["flex-row"]: variant === ReviewsVariant.HORIZONTAL,
      })}
    >
      <img
        src="https://via.placeholder.com/150"
        alt="placeholder"
      />
      <h5 className="text-lg font-bold">John Doe</h5>
      <p className="text-sm">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus
        nec diam laoreet sollicitudin."
      </p>
    </div>
  );
};

export default Review;

import { ReviewsVariant } from "@/components/Review";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export default function Home() {
  return (
    <div className="">
      <main className="p-[20px]"><ReviewsCarousel title={"Customer's Reviews"} reviews={reviewsData} variant={ReviewsVariant.HORIZONTAL} allowTouch /></main>
      <footer className=""></footer>
    </div>
  );
}


const reviewsData = [
  {
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque et felis lacinia ultricies. Cras nec metus sit amet nunc.",
    rating: 4,
    name: "John Doe",
    imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
  },
  {
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 2.5,
    name: "Jane Doe",
    imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
  },
  {
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque et felis lacinia ultricies. Cras nec metus sit amet nunc.",
    rating: 3,
    name: "John Doe",
    imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
  },
  {
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque et felis lacinia ultricies. Cras nec metus sit amet nunc.",
    rating: 2,
    name: "Jane Doe",
    imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
  },
  {
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque et felis lacinia ultricies. Cras nec metus sit amet nunc.",
    rating: 1,
    name: "John Doe",
    imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
  },
  {
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis neque et felis lacinia ultricies. Cras nec metus sit amet nunc.",
    rating: 5,
    name: "Jane Doe",
    imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
  }
];

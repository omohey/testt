import ReviewsCarousel from "@/components/ReviewsCarousel";

export default function Home() {
    return (
        <div className="">
            <main className="p-[20px]" dir="rtl"><ReviewsCarousel title={"ارى العملاء"} reviews={reviewsData} /></main>
            <footer className=""></footer>
        </div>
    );
}


const reviewsData = [
    {
        reviewText: "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .",
        rating: 4,
        name: "جون دو",
        imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
    },
    {
        reviewText: "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .",
        rating: 2.5,
        name: "جين دو",
        imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
    },
    {
        reviewText: "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود",
        rating: 3,
        name: "جون دو",
        imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
    },
    {
        reviewText: "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .",
        rating: 2,
        name: "جين دو",
        imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
    },
    {
        reviewText: "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .",
        rating: 1,
        name: "جون دو",
        imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
    },
    {
        reviewText: "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا .",
        rating: 5,
        name: "جين دو",
        imgSrc: "https://i.ibb.co/HDSLgqKj/profile.jpg",
    }
];

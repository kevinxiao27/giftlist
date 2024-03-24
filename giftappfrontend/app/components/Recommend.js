import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const RecommendCarousel = ({ data }) => {
  const recommendedGifts = data;
  return (
    <>
      <div className="w-[64vw] bg-purple-100">
        <Carousel
          responsive={responsive}
          containerClass={`w-full`}
          autoPlay={false}
          swipeable={false}
          draggable={false}
        >
          {recommendedGifts.map((gift, index) => (
            <div
              className="py-2 mx-[20px] overflow-hidden w-[3/5] bg-purple-100 rounded-[1rem] p-3"
              key={index}
            >
              <div className="h-[30vh] w-full">
                <Image
                  width={500}
                  height={500}
                  style={{ objectFit: "contain" }}
                  src={gift.image}
                />
              </div>
              <div className="text-[#50006c] px-2">
                {gift.name.toUpperCase()}
              </div>
              <a className="px-2 underline text-[#e42d55]" href={gift.link}>
                Purchase Link
              </a>
              <div className="px-2">Price: {gift.price}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default RecommendCarousel;

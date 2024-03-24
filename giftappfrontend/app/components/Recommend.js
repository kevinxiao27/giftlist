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
      <div className="w-[56vw] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] p-5">
        <Carousel
          responsive={responsive}
          containerClass={`w-full`}
          autoPlay={false}
          swipeable={true}
          draggable={true}
        >
          {recommendedGifts.map((gift, index) => (
            <div
              className="overflow-hidden bg-purple-100 p-3 flex flex-col items-center"
              key={index}
            >
              <div className="h-[30vh] w-full flex flex-row justify-center overflow-hidden relative p-3">
                <Image
                  width={500}
                  height={1000}
                  style={{
                    objectFit: "cover",
                    layout: "fill",
                    borderRadius: "25px",
                  }}
                  src={gift.image}
                  alt="prompt image"
                />
              </div>
              <div className="text-[#50006c] px-2 text-[1.3rem] py-3">
                {gift.name.toUpperCase()}
              </div>
              <div className="flex flex-row justify-normal pb-7">
                <a
                  className=" text-[#ffffff] bg-[#20006c] p-3 rounded-lg px-8"
                  href={gift.link}
                >
                  Purchase Link
                </a>
                <div className="p-3 px-8">Price: {gift.price}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default RecommendCarousel;

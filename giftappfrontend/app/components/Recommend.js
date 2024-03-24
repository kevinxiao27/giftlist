import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import { useState, useRef, useMemo } from "react";
import React from "react";

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
  const [currentIndex, setCurrentIndex] = useState(recommendedGifts.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(recommendedGifts.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < recommendedGifts.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < recommendedGifts.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      <div className="w-[56vw] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] p-5 h-[53vh]">
        <div className="flex flex-col items-center justify-center">
          {recommendedGifts.map((gift, index) => (
            <div className="w-full flex flex-row justify-center px-3">
              <TinderCard
                ref={childRefs[index]}
                className="swipe bg-purple-100 w-[90%] rounded-[1rem]"
                key={gift.name}
                onSwipe={(dir) => swiped(dir, gift.name, index)}
                onCardLeftScreen={() => outOfFrame(gift.name, index)}
              >
                <div className="card flex flex-col justify-center items-center w-full rounded-lg">
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
                  <div className="text-[#50006c] px-4 text-[1.3rem] py-3">
                    {gift.name.toUpperCase()}
                  </div>
                  <div className="flex flex-row items-center align-center justify-center pb-7">
                    <a
                      className=" text-[#ffffff] bg-[#20006c] p-3 rounded-lg px-8"
                      href={gift.link}
                    >
                      Purchase Link
                    </a>
                    <div className="p-3 px-8">Price: {gift.price}</div>
                  </div>
                </div>
              </TinderCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendCarousel;

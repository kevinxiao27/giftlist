"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar.js";
import { usePathname } from "next/navigation";
import RecommendCarousel from "@/app/components/Recommend.js";
import { searchImages } from "@/app/utils/unsplash.js";

const Page = () => {
  const [isBusy, setIsBusy] = useState(true);
  const [gifts, setGifts] = useState({
    gifts: [
      {
        name: "thing",
        link: "https://www.amazon.ca/s?k=Local+Handmade+Soap",
        price: "$23.22",
      },
    ],
  });
  const id = decodeURI(usePathname().substring(10));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/swiftgift/gifts/recommend/${id}`);
        const data = await response.json();

        const gifts = data.gifts;

        const payload = await Promise.all(
          gifts.map(async (gift) => {
            const query = gift.name.split(" ").join("+");
            const imageResponse = await searchImages(query);
            return {
              name: gift.name,
              price: gift.price,
              link: gift.link,
              image: imageResponse,
            };
          })
        );
        console.log(payload);
        setGifts(payload);
        setIsBusy(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="bg-light-background">
        <Navbar />
        <div className="absolute top-[25vh] left-[18vw]">
          {isBusy ? (
            <div className="text-[#50006c]">Loading ...</div>
          ) : (
            <>
              <div className="text-[#50006c] text-[3rem] w-full align-center flex justify-center align-center">
                Recommended Gifts!
              </div>
              <RecommendCarousel data={gifts} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

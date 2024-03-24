"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import WishScroller from "../components/WishScroller";

const Page = () => {
  const [gifts, setGifts] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/swiftgift/gifts");
        const data = await response.json();

        console.log(data);

        if (!data) {
          console.error("no gifts");
        }

        setGifts(data.gifts);
        setIsBusy(false);

        // console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="bg-light-background">
        <Navbar />
        <div className="absolute top-[25vh] left-[25vw]">
          {isBusy ? (
            <div className="absolute w-[25vh]">
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
              loading
            </div>
          ) : (
            <>
              <div className="text-[#50006c] text-[3rem] w-full align-center flex justify-center align-center">
                Potential Interests Wishlist
              </div>
              <WishScroller data={gifts} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

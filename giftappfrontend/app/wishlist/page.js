"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import WishScroller from "../components/WishScroller";

const Page = () => {
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/swiftgift/gifts");
        const data = await response.json();

        if (!data) {
          console.error("no gifts");
        }

        setGifts(data.gifts);

        console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="absolute top-[15vh]">
        <WishScroller data={gifts} />
      </div>
    </>
  );
};

export default Page;

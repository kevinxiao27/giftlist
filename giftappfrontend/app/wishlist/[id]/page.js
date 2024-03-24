"use client";

import { useEffect } from "react";
import Navbar from "../../components/NavBar.js";
import { usePathname } from "next/navigation";

const Page = () => {
  const id = decodeURI(usePathname().substring(10));
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/swiftgift/gifts/recommend/${id}`);
      const data = await response.json();
    };
  });
  return (
    <>
      <div className="bg-light-background">
        <Navbar />
        <div>{id}</div>
      </div>
    </>
  );
};

export default Page;

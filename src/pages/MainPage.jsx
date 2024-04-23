import React from "react";
import StickyNavbar from "../components/ui/StickyNavbar";
import CarouselWithContent from "../components/ui/CarouselWithContent";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";

const MainPage = () => {
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible  ">
      <StickyNavbar>
        <div className="mx-auto w-full h-[500px] flex justify-center">
          <CarouselWithContent />
        </div>
        <div className="mt-6 mx-40 px-4">
          <h1 className="text-xl mx-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            placeat doloribus quasi nisi fugit deleniti nam aperiam est facilis
            nobis ipsam labore, in tempore quis ex. Reprehenderit quia dolores
            ipsa.
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
            <EcommerceCard />
          </div>
          <FooterWithLogo></FooterWithLogo>
        </div>
      </StickyNavbar>
    </div>
  );
};

export default MainPage;

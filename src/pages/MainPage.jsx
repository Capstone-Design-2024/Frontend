import React from "react";
import StickyNavbar from "../components/ui/StickyNavbar";
import CarouselWithContent from "../components/ui/CarouselWithContent";

const MainPage = () => {
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <StickyNavbar>
        <div className="mx-auto w-full h-[500px] flex justify-center">
          <CarouselWithContent />
        </div>
        <div className="mt-6 bg-red-500 mx-40 flex px-8">
          <h1 className="text-9xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            placeat doloribus quasi nisi fugit deleniti nam aperiam est facilis
            nobis ipsam labore, in tempore quis ex. Reprehenderit quia dolores
            ipsa.
          </h1>
        </div>
      </StickyNavbar>
    </div>
  );
};

export default MainPage;

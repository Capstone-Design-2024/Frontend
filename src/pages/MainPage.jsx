import React from "react";
import StickyNavbar from "../components/ui/StickyNavbar";
import CarouselWithContent from "../components/ui/CarouselWithContent";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";
import { Typography } from "@material-tailwind/react";

const MainPage = ({ isLoggedIn }) => {
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible  ">
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="mx-auto w-full h-[500px] flex justify-center">
          <CarouselWithContent />
        </div>
        <div className="mt-6 mx-40 px-4 ">
          <Typography
            variant="h1"
            className="flex justify-center mb-5 text-3xl md:text-4xl lg:text-5xl"
          >
            Projects on progress
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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

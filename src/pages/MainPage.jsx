import React from "react";
import StickyNavbar from "../components/ui/StickyNavbar";
import CarouselWithContent from "../components/ui/CarouselWithContent";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";
import { Typography } from "@material-tailwind/react";
import { CategoryBar } from "../components/ui/CategoryBar";
import bgBlur from "../assets/bg-blur.png";
import bgBlur2 from "../assets/bg-blur2.png";

const MainPage = ({ isLoggedIn }) => {
  const products = [
    {
      title: "Airpods Pro",
      price: "$299.99",
      description: "good earphone",
      status: 50,
      instruction: "Add to Cart",
    },
    {
      title: "Airpods Pro",
      price: "$299.99",
      description: "good earphone",
      status: 50,
      instruction: "Add to Cart",
    },
  ];
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible  ">
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <CategoryBar />
        <div className="mx-auto w-full h-[500px] flex justify-center">
          <CarouselWithContent />
        </div>

        <div
          style={{
            backgroundImage: `url(${bgBlur}), url(${bgBlur2})`,
            backgroundOrigin: "border-box",
            backgroundSize: "contain, contain",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "-100% 70%, 140% 100%",
          }}
          className="py-8"
        >
          <div className="mx-40 px-4">
            <div className="flex justify-between ">
              <div className="w-7/12">
                <Typography variant="h5" className="mb-5 ml-3 text-gray-700">
                  Featured Project
                </Typography>
                <EcommerceCard
                  title={"Test item"}
                  price={"$300.00"}
                  description={"test"}
                  status={70}
                />
              </div>
              <div>
                <Typography variant="h5" className="mb-5 ml-3 text-gray-700">
                  Recommended for you
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-2 gap-4">
                  {products.map((product, index) => (
                    <EcommerceCard
                      key={index}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                      status={product.status}
                      instruction={product.instruction}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-40">
            <FooterWithLogo />
          </div>
        </div>
      </StickyNavbar>
    </div>
  );
};

export default MainPage;

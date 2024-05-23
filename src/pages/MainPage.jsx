import React, { useMemo, lazy, Suspense } from "react";
import { Typography } from "@material-tailwind/react";
import bgBlurWebP from "../assets/bg-blur1.webp";
import bgBlur2WebP from "../assets/bg-blur2.webp";

const StickyNavbar = lazy(() => import("../components/ui/StickyNavbar"));
const CarouselWithContent = lazy(() =>
  import("../components/ui/CarouselWithContent")
);
const FooterWithLogo = lazy(() => import("../components/ui/FooterWithLogo"));
const EcommerceCard = lazy(() => import("../components/ui/EcommerceCard"));
const FeatureBlock = lazy(() => import("../components/ui/FeatureBlock"));

const MainPage = ({ isLoggedIn }) => {
  const products = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <Suspense fallback={<div>loading...</div>}>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="mx-auto w-full h-[500px] flex justify-center">
          <CarouselWithContent />
        </div>
        <div
          style={{
            backgroundImage: `url(${bgBlurWebP}), url(${bgBlur2WebP})`,
            backgroundOrigin: "border-box",
            backgroundSize: "contain, contain",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "-100% 70%, 130% 100%",
          }}
          className="py-8 h-[680px]"
        >
          <div className="mx-40 px-4">
            <div className="flex justify-between">
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
              <div className="w-5/12 ml-5">
                <Typography variant="h5" className="mb-5 ml-1 text-gray-700">
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
        </div>
        <div
          style={{
            backgroundImage: `url(${bgBlur2WebP})`,
            backgroundOrigin: "border-box",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "40% 100%",
          }}
        >
          <FeatureBlock />
        </div>
        <div className="mx-40">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </Suspense>
  );
};

export default MainPage;

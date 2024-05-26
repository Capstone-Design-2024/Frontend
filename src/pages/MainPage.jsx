import React, { useMemo, lazy, Suspense } from "react";
import { Typography } from "@material-tailwind/react";
import bgBlurWebP from "../assets/bg-blur1.webp";
import bgBlur2WebP from "../assets/bg-blur2.webp";
import Loading from "../components/ui/loading/Loading";

const StickyNavbar = lazy(() => import("../components/ui/navbar/StickyNavbar"));
const CarouselWithContent = lazy(() =>
  import("../components/ui/CarouselWithContent")
);
const FooterWithLogo = lazy(() => import("../components/ui/FooterWithLogo"));
const EcommerceCard = lazy(() => import("../components/ui/EcommerceCard"));
const FeatureBlock = lazy(() => import("../components/ui/FeatureBlock"));

const MainPage = ({ isLoggedIn }) => {
  const token = localStorage.getItem("token");
  console.log(token);
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
    <Suspense fallback={<Loading />}>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="mx-auto w-full flex justify-center">
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
          className="py-8 h-auto lg:h-[680px] bg-cover bg-no-repeat"
        >
          <div className="mx-4 lg:mx-40 px-4">
            <div className="flex flex-col lg:flex-row xl:justify-between">
              <div className="w-full xl:w-7/12">
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
              <div className="w-full xl:w-5/12 xl:ml-5 mt-4 lg:mt-0">
                <Typography variant="h5" className="mb-5 ml-1 text-gray-700">
                  Recommended for you
                </Typography>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            <a
              href="/fe/projectslist"
              className="flex justify-end mt-5 items-center place-content-start"
            >
              <Typography className="text-purple-700 font-medium">
                See all projects &nbsp;
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#7e22ce"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
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
          className="bg-cover bg-no-repeat py-8"
        >
          <div className="mx-4 lg:mx-40">
            <FeatureBlock />
          </div>
        </div>
        <div className="container mx-auto px-4">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </Suspense>
  );
};

export default MainPage;

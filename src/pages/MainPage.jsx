import React, { lazy, Suspense, useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../config";

const StickyNavbar = lazy(() => import("../components/ui/navbar/StickyNavbar"));
const CarouselWithContent = lazy(() =>
  import("../components/ui/CarouselWithContent")
);
const FooterWithLogo = lazy(() => import("../components/ui/FooterWithLogo"));
const EcommerceCard = lazy(() => import("../components/ui/EcommerceCard"));
const FeatureBlock = lazy(() => import("../components/ui/FeatureBlock"));

const MainPage = ({ isLoggedIn, isLoading }) => {
  const [featuredProject, setFeaturedProject] = useState({ title: "" });
  const [recommendedProjects, setRecommendedProjects] = useState([
    { title: "" },
    { title: "" },
  ]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API.READPROJECTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFeaturedProject(response.data.data[0]);
        setRecommendedProjects(response.data.data.slice(1, 3));
      })
      .catch((error) => {
        console.log("Error fetching projects", error);
      });
  }, [token]);

  return (
    <Suspense>
      <div className={`${isLoading && "animate-pulse"}`}>
        <StickyNavbar isLoggedIn={isLoggedIn}>
          <div className="mx-auto w-full flex justify-center">
            <CarouselWithContent />
          </div>
          <div className="py-8 bg-gray-50">
            <div className="mx-4 lg:mx-40 px-4">
              <div className="grid  xl:grid-cols-2 gap-5">
                <div className="w-full">
                  <Typography variant="h5" className="mb-3 ml-3 text-gray-700">
                    Featured Project
                  </Typography>
                  <EcommerceCard
                    project={featuredProject}
                    fullWidth={true}
                    onClick={() =>
                      navigate(`/createproject/${featuredProject.projectId}`)
                    }
                    status={70}
                    cardType={"feature"}
                  />
                </div>
                <div className="w-full">
                  <Typography variant="h5" className="mb-3 ml-1 text-gray-700">
                    Recommended for you
                  </Typography>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {recommendedProjects.map((project, index) => (
                      <EcommerceCard
                        key={index}
                        project={project}
                        status={70}
                        onClick={() =>
                          navigate(`/createproject/${project.projectId}`)
                        }
                        isMain={true}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <a
                href="/projectslist"
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
          <div className="bg-cover bg-no-repeat py-4 mt-3">
            <div className="mx-4 lg:mx-40">
              <FeatureBlock />
            </div>
          </div>
          <div className="container mx-auto px-4">
            <FooterWithLogo />
          </div>
        </StickyNavbar>
      </div>
    </Suspense>
  );
};

export default MainPage;

import React, { lazy, Suspense, useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../config";

const StickyNavbar = lazy(() => import("../components/ui/navbar/StickyNavbar"));
const CarouselWithContent = lazy(
  () => import("../components/ui/CarouselWithContent"),
);
const FooterWithLogo = lazy(() => import("../components/ui/FooterWithLogo"));
const EcommerceCard = lazy(() => import("../components/ui/EcommerceCard"));

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
      <div>
        <StickyNavbar isLoggedIn={isLoggedIn}>
          <CarouselWithContent />
          <div className="py-8">
            <div className="mx-4 lg:mx-64">
              <div className="lg:grid lg:grid-cols-2 lg:space-x-5">
                <div className="w-full">
                  <Typography variant="h6" className="mb-2 ml-4 text-black">
                    FEATURED PROJECT
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
                  <Typography variant="h6" className="mb-2 ml-4 text-black">
                    RECOMMENDED FOR YOU
                  </Typography>
                  <div className="grid-cols-1 gap-5 lg:grid lg:grid-cols-2">
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
                href="/projectslist/all"
                className="mt-5 flex place-content-start items-center justify-end"
              >
                <Typography className="font-medium text-purple-700">
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
          <hr />
          <div className="container mx-auto px-4">
            <FooterWithLogo />
          </div>
        </StickyNavbar>
      </div>
    </Suspense>
  );
};

export default MainPage;

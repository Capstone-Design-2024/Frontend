import React, { useState, useEffect } from "react";
import axios from "axios";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import { API } from "../config";
import bgBlur1 from "../assets/bg-blur1.webp";
import bgBlur2 from "../assets/bg-blur2.webp";
import { Typography } from "@material-tailwind/react";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";
import Slider from "../components/ui/slider/Slider";

const ProjectsListPage = ({ isLoggedIn }) => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API.READPROJECTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching projects", error);
      });
  }, [token]);

  return (
    <>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div
          style={{
            backgroundImage: `url(${bgBlur1}), url(${bgBlur2})`,
            backgroundOrigin: "border-box",
            backgroundSize: "contain, contain",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "-1900% , 130% ",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="flex justify-center mb-5 ">
            <div className="mt-5 w-full mx-64">
              <div className="flex flex-col p-8 border bg-white border-gray-300 rounded-lg">
                <Typography className="font-medium text-black">
                  Refine
                </Typography>
                <Slider className="w-full" min={0} max={1000} />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-10 mx-60 px-4 flex justify-start">
              <Typography variant="h5" className="text-gray-700">
                Explore{" "}
                <span className="text-purple-700">
                  {projects.length} projects
                </span>
              </Typography>
            </div>
            <div className="mt-1 border-e-0 min-h-96">
              <div className="mx-60">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 p-4">
                  {projects.map((project, idx) => {
                    return (
                      <EcommerceCard
                        key={idx}
                        project={project}
                        status={70}
                        onClick={() =>
                          navigate(`/createproject/${project.projectId}`)
                        }
                        className="xl:w-[265px] min-w-[211px] h-[441px] bg-white bg-opacity-10 place-content-center focus:bg-gray-600 hover:bg-gray-600"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 mx-40 px-4 ">
            <FooterWithLogo />
          </div>
        </div>
      </StickyNavbar>
    </>
  );
};

export default ProjectsListPage;

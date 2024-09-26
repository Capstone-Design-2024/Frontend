import React, { useState, useEffect } from "react";
import axios from "axios";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import { API } from "../config";
import { Typography } from "@material-tailwind/react";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";

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
        <div className="bg-gray-50 mt-2 py-5">
          <div className="mx-14 md:mx-36 lg:mx-60">
            <div className="flex justify-center lg:justify-start pl-4">
              <Typography variant="h5" className="text-gray-700">
                Explore{" "}
                <span className="text-purple-700">
                  {projects.length} projects
                </span>
              </Typography>
            </div>
            <div className="mt-1 border-e-0 min-h-96">
              <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
        </div>
        <div className="mt-6 mx-40 px-4 ">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </>
  );
};

export default ProjectsListPage;

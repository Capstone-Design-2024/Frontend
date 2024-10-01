import React, { useState, useEffect } from "react";
import axios from "axios";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import { API } from "../config";
import { Typography } from "@material-tailwind/react";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";
import { useParams } from "react-router-dom";
import { emptyProjects } from "./emptyProjects";

const ProjectsListPage = ({ isLoggedIn }) => {
  const [projects, setProjects] = useState(emptyProjects);
  const token = localStorage.getItem("token");
  const [userFeedback, setUserFeedback] = useState("Loading...");
  const { itemCategory } = useParams();

  useEffect(() => {
    axios
      .get(API.READPROJECTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedProjects = response.data.data;

        if (itemCategory === "all") {
          if (fetchedProjects.length > 0) {
            setProjects(fetchedProjects);
          } else {
            setUserFeedback("Oops! there is no project yet");
            setProjects(emptyProjects);
          }
        } else {
          const filteredProjects = fetchedProjects.filter(
            (project) => project.category === itemCategory
          );

          if (filteredProjects.length > 0) {
            setProjects(filteredProjects);
          } else {
            setUserFeedback("Oops! there is no project yet in this category");
            setProjects(emptyProjects);
          }
        }
      })
      .catch((error) => {
        console.log("Error fetching projects", error);
        setUserFeedback("An error occurred while fetching projects");
        setProjects(emptyProjects);
      });
  }, [token, itemCategory]);

  return (
    <>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="bg-gray-50 mt-2 py-5">
          <div className="mx-14 md:mx-36 lg:mx-60">
            {itemCategory !== "all" && (
              <Typography variant="h4" className="pl-4 mb-3">
                {itemCategory}
              </Typography>
            )}
            <div className="flex justify-center lg:justify-start pl-4">
              <Typography variant="h5" className="text-gray-700">
                {projects[0].title !== "" ? (
                  <>
                    Explore{" "}
                    <span className="text-purple-700">
                      {projects.length} Projects
                    </span>
                  </>
                ) : (
                  userFeedback
                )}
              </Typography>
            </div>
            <div className="mt-1 border-e-0 min-h-96">
              <div>
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

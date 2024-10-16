import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import { API } from "../config";
import { Typography } from "@material-tailwind/react";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import EcommerceCard from "../components/ui/EcommerceCard";
import { useParams, useNavigate } from "react-router-dom";
import { emptyProjects } from "./emptyProjects";
import TabsComponent from "../components/ui/TabsComponent";

const ProjectsListPage = ({ isLoggedIn }) => {
  const [projects, setProjects] = useState(emptyProjects);
  const token = localStorage.getItem("token");
  const [userFeedback, setUserFeedback] = useState("Loading...");
  const { itemCategory } = useParams();
  const [selectedType, setSelectedType] = useState("On Funding");
  const [projectType, setProjectType] = useState({
    "On Funding": {},
    Closed: {},
  });
  const navigate = useNavigate();

  // Fetch projects data
  const fetchProjects = useCallback(async () => {
    setUserFeedback("Loading...");
    try {
      const response = await axios.get(API.READPROJECTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedProjects = response.data.data;

      if (fetchedProjects.length > 0) {
        const currentDate = new Date();
        const onFundingProjects = {};
        const closedProjects = {};

        // Categorize projects based on their funding status
        fetchedProjects.forEach((project) => {
          const deadline = new Date(project.deadLine);
          const isOnFunding = deadline > currentDate;
          const category = project.category || "Uncategorized";

          if (isOnFunding) {
            if (!onFundingProjects[category]) {
              onFundingProjects[category] = [];
            }
            onFundingProjects[category].push(project);
          } else {
            if (!closedProjects[category]) {
              closedProjects[category] = [];
            }
            closedProjects[category].push(project);
          }
        });

        setProjectType({
          "On Funding": onFundingProjects,
          Closed: closedProjects,
        });
        setUserFeedback(""); // Clear feedback if projects are available
      } else {
        setUserFeedback("Oops! there is no project yet");
      }
    } catch (error) {
      console.log("Error fetching projects", error);
      setUserFeedback("An error occurred while fetching projects");
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Determine the projects to be displayed based on selected category and type
  const currentProjects = useMemo(() => {
    let projectsList = [];
    if (itemCategory === "all") {
      Object.keys(projectType[selectedType]).forEach((category) => {
        projectsList = projectsList.concat(projectType[selectedType][category]);
      });
    } else {
      projectsList = projectType[selectedType][itemCategory] || [];
    }

    if (projectsList.length === 0 && userFeedback === "") {
      setUserFeedback(
        `No projects available in the ${selectedType} tab${
          itemCategory !== "all" ? ` for the \"${itemCategory}\" category` : ""
        }.`,
      );
    }

    return projectsList.length > 0 ? projectsList : emptyProjects;
  }, [projectType, selectedType, itemCategory, userFeedback]);

  useEffect(() => {
    setProjects(currentProjects);
  }, [currentProjects]);

  return (
    <>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="mt-2 py-5">
          <div className="mx-14 lg:mx-60 xl:mx-72">
            <div className="pl-4">
              <Typography className="text-2xl font-semibold">
                {itemCategory === "all" ? "All" : itemCategory}
              </Typography>
              <div className="flex items-center justify-between">
                <Typography className="text-lg font-medium text-gray-700">
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
                <div className="w-2/12">
                  <TabsComponent
                    tabs={projectType}
                    selectedTab={selectedType}
                    setSelectedTab={setSelectedType}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 w-72 pl-3"></div>
            <div className="mt-1 min-h-96 border-e-0">
              <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                  {projects.map((project, idx) => (
                    <EcommerceCard
                      key={project.projectId}
                      project={project}
                      status={70}
                      onClick={() =>
                        navigate(`/createproject/${project.projectId}`)
                      }
                      className="h-[441px] min-w-[211px] place-content-center bg-white bg-opacity-10 hover:bg-gray-600 focus:bg-gray-600 xl:w-[265px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-40 mt-6 px-4">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </>
  );
};

export default ProjectsListPage;

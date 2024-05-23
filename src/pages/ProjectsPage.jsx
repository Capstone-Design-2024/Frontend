import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Card } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/StickyNavbar";
import EcommerceCard from "../components/ui/EcommerceCard";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import { API } from "../config";
import bgBlur1 from "../assets/bg-blur1.webp";
import bgBlur2 from "../assets/bg-blur2.webp";

const ProjectsPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  console.log(projects);

  useEffect(() => {
    axios
      .get(API.READPROJECT, {
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

  const createProjectHandler = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API.INITPROJECT}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      navigate("/createproject");
    } catch (error) {
      console.log("Error Creating Project:", error);
    }
  };

  return (
    <div>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div
          style={{
            backgroundImage: `url(${bgBlur1}), url(${bgBlur2})`,
            backgroundOrigin: "border-box",
            backgroundSize: "contain, contain",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "-80% 70%, 130% 100%",
          }}
          className="py-8"
        >
          <div className="mt-10 mx-48 px-4 flex justify-start">
            <Typography variant="h5" className="text-gray-700">
              My Projects
            </Typography>
          </div>
          <div className="mt-5 py-6 border-e-0 min-h-96">
            <div className="mx-48 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <Card className="xl:w-[265px] min-w-[211px] h-[441px] bg-white bg-opacity-10 place-content-center focus:bg-gray-600 hover:bg-gray-600">
                  <Button
                    onClick={createProjectHandler}
                    className="w-full h-full !normal-case text-md text-gray-600 flex flex-col items-center justify-center  bg-white/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span>Click to create project</span>
                    </div>
                  </Button>
                </Card>
                {projects.map((project, idx) => {
                  const today = new Date();
                  const projectTimeLine = new Date(project.deadLine);
                  return (
                    <EcommerceCard
                      key={idx}
                      title={project.title}
                      project={project}
                      description={
                        today > projectTimeLine
                          ? "Closed"
                          : "Funding on progress"
                      }
                      instruction={today > projectTimeLine}
                      thumbnail={project.thumbnail}
                      onClick={() =>
                        navigate(`/createproject/${project.projectId}`)
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </StickyNavbar>
      <div className="mt-6 mx-40 px-4 ">
        <FooterWithLogo />
      </div>
    </div>
  );
};

export default ProjectsPage;

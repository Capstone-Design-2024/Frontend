import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import BreadcrumbsDefault from "../ui/BreadcrumbsDefault";
import { DefaultSidebar } from "../ui/DefaultSidebar";
import ProjectInfo from "./ProjectInfo";
import BasicInfo from "./BasicInfo";
import StoryLine from "./StoryLine";
import CreaterInfo from "./CreaterInfo";

export default function ManageProject() {
  const [current, setCurrent] = useState("Project Information");
  const [projectForm, setProjectForm] = useState({
    projectInfo: {
      category: "Please choose the category",
      targetFund: "",
      dueDate: "",
    },
    basicInfo: { projectName: "", projectImage: "" },
    storyLine: { projectDescription: "" },
    createrInfo: { createrName: "", createrEmail: "", createrPhoneNumber: "" },
  });
  const [pageDisable, setPageDisable] = useState({
    projectInfo: false,
    basicInfo: true,
    storyLine: true,
    createrInfo: true,
  });
  const [buttonAvailability, setButtonAvailability] = useState(true);
  const CurrentState = () => {
    if (current === "Project Information") {
      return (
        <ProjectInfo
          projectInfo={projectForm.projectInfo}
          setProject={setProjectForm}
          setCurrent={setCurrent}
          setAvailability={setPageDisable}
        ></ProjectInfo>
      );
    } else if (current === "Basic Information") {
      return (
        <BasicInfo
          basicInfo={projectForm.basicInfo}
          setProject={setProjectForm}
          setCurrent={setCurrent}
          setAvailability={setPageDisable}
        ></BasicInfo>
      );
    } else if (current === "Story Line") {
      return (
        <StoryLine
          storyLine={projectForm.storyLine}
          setProject={setProjectForm}
          setCurrent={setCurrent}
          setAvailability={setPageDisable}
        ></StoryLine>
      );
    } else if (current === "Creater Information") {
      return (
        <CreaterInfo
          createrInfo={projectForm.createrInfo}
          setProject={setProjectForm}
          setCurrent={setCurrent}
          setButtonAvailability={setButtonAvailability}
        ></CreaterInfo>
      );
    }
  };

  return (
    <div className="flex justify-start">
      <DefaultSidebar
        setCurrent={setCurrent}
        availability={pageDisable}
        buttonAvailability={buttonAvailability}
      />
      <div className="mx-auto mt-10 max-w-screen-xl w-full">
        <BreadcrumbsDefault current={current}></BreadcrumbsDefault>
        <div className="flex justify-between">
          <Typography variant="h2" className="mt-2">
            {current}
          </Typography>
          <div className="place-content-center">
            <Button size="sm">Save</Button>
          </div>
        </div>
        <div className="mt-5">
          <CurrentState />
        </div>
      </div>
    </div>
  );
}

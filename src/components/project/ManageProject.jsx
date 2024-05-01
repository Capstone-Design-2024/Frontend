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
  const CurrentState = () => {
    if (current === "Project Information") {
      return <ProjectInfo></ProjectInfo>;
    } else if (current === "Basic Information") {
      return <BasicInfo></BasicInfo>;
    } else if (current === "Story Line") {
      return <StoryLine></StoryLine>;
    } else if (current === "Creater Information") {
      return <CreaterInfo></CreaterInfo>;
    }
  };
  return (
    <div className="flex justify-start">
      <DefaultSidebar setCurrent={setCurrent} />
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

import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import BreadcrumbsDefault from "../ui/BreadcrumbsDefault";
import { DefaultSidebar } from "../ui/DefaultSidebar";
import ProjectInfo from "./ProjectInfo";
import BasicInfo from "./BasicInfo";
import StoryLine from "./StoryLine";
import CreaterInfo from "./CreaterInfo";
import { API } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessDialog from "./SuccessDialog";

export default function ManageProject() {
  const userEmail = localStorage.getItem("email");
  const { projectId } = useParams();
  const [current, setCurrent] = useState("Project Information");
  const [projectForm, setProjectForm] = useState({
    projectInfo: {
      mainCategory: "Please choose the category",
      subCategory: "",
      targetFund: "",
      dueDate: "",
    },
    basicInfo: { projectName: "", projectImage: "", projectPrice: "" },
    storyLine: { projectDescription: "" },
    createrInfo: {
      createrName: "",
      createrEmail: userEmail,
      createrPhoneNumber: "",
    },
  });
  const [pageDisable, setPageDisable] = useState({
    projectInfo: false,
    basicInfo: true,
    storyLine: true,
    createrInfo: true,
  });
  const [buttonAvailability, setButtonAvailability] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState({
    info: false,
    img: false,
  });
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccessDialogOpen = () => setIsSuccessDialogOpen((cur) => !cur);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const submitInfoHandler = async () => {
    try {
      const response = await axios.post(
        `${API.REGISTERPROJECT}`,
        {
          projectId: projectId,
          title: projectForm.basicInfo.projectName,
          description: projectForm.storyLine.projectDescription,
          category: projectForm.projectInfo.mainCategory,
          goalAmount: projectForm.projectInfo.targetFund,
          deadLine: projectForm.projectInfo.dueDate,
          contactPhone: projectForm.createrInfo.createrPhoneNumber,
          contactEmail: projectForm.createrInfo.createrEmail,
          price: projectForm.basicInfo.projectPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Success:", response);
      setSubmitSuccess((prev) => ({ ...prev, info: true }));
    } catch (error) {
      console.log("Error Creating Project:", error.response);
      setSubmitSuccess((prev) => ({ ...prev, info: false }));
    }
  };

  const uploadImageHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        `${API.UPLOADIMAGE}/${projectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Image uploaded successfully:", response);
      setSubmitSuccess((prev) => ({ ...prev, img: true }));
    } catch (error) {
      console.error("Error uploading image:", error.response);
      setSubmitSuccess((prev) => ({ ...prev, img: false }));
    }
  };

  const submitHandler = async () => {
    setIsLoading(true);
    await submitInfoHandler();
    await uploadImageHandler(projectForm.basicInfo.projectImage);
    setIsLoading(false);
  };

  useEffect(() => {
    if (submitSuccess.img && submitSuccess.info) {
      handleSuccessDialogOpen();
    }
  }, [submitSuccess, navigate]);

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
    <>
      <div className="flex justify-start">
        <DefaultSidebar
          setCurrent={setCurrent}
          availability={pageDisable}
          buttonAvailability={buttonAvailability}
          onSubmit={submitHandler}
        />
        <div className="mx-auto mt-10 w-full max-w-screen-xl">
          <BreadcrumbsDefault current={current}></BreadcrumbsDefault>
          <div className="flex justify-between">
            <Typography variant="h2" className="mt-2">
              {current}
            </Typography>
          </div>
          <div className="mt-5">
            <CurrentState />
          </div>
        </div>
      </div>
      {isSuccessDialogOpen && (
        <SuccessDialog
          isOpen={isSuccessDialogOpen}
          handler={handleSuccessDialogOpen}
          project={{
            id: projectId,
            title: projectForm.basicInfo.projectName,
            description: projectForm.storyLine.projectDescription,
            thumbnail: URL.createObjectURL(projectForm.basicInfo.projectImage),
            contactEmail: projectForm.createrInfo.createrEmail,
          }}
          isLoading={isLoading}
          fromManageProject={true}
        />
      )}
    </>
  );
}

import React, { useRef, useState, useEffect } from "react";
import "./NFTTicket.css";
import { Card, Typography } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import axios from "axios";
import { API } from "../../config";

const NFTTicket = ({ project, fromManageProject }) => {
  const [frontImageUrl, setFrontImageUrl] = useState("");
  const [backImageUrl, setBackImageUrl] = useState("");
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [nftInfo, setNftInfo] = useState({ makerAddress: "" });
  const [thumbnailFromProject, setThumbnailFromProject] = useState("");
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  console.log("project", project);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadImage = async () => {
      const data = { s3_url: project.thumbnail };
      try {
        const response = await axios.post(`${API.S3IMAGEPROXY}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });
        const thumbnailUrl = URL.createObjectURL(response.data);
        setThumbnailFromProject(thumbnailUrl);
        setThumbnailLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (!fromManageProject) {
      loadImage();
      console.log("load");
    } else {
      const img = new Image();
      img.src =
        typeof project.thumbnail === "string"
          ? project.thumbnail
          : URL.createObjectURL(project.thumbnail);
      img.onload = () => {
        console.log("load");
        setThumbnailLoaded(true);
      };
      img.onerror = () => {
        console.error("Error loading image");
        setThumbnailLoaded(false);
      };
      setThumbnailFromProject(img.src);
    }
  }, [project.thumbnail, fromManageProject, token]);

  useEffect(() => {
    const fetchNftInfo = async () => {
      const data = { project_id: +project.id };
      console.log("Data being sent to API:", data);
      try {
        const response = await axios.post(`${API.NFTREGISTRY}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const makerAddress = response.data.project_meta_info.makerAddress;
        setNftInfo({ makerAddress });
      } catch (error) {
        console.log(error);
      }
    };
    if (fromManageProject !== false) {
      fetchNftInfo();
    }
  }, [fromManageProject, project.projectId, token]);

  useEffect(() => {
    const captureAsJpg = async () => {
      if (thumbnailLoaded && nftInfo.makerAddress) {
        const frontCanvas = await html2canvas(frontCardRef.current, {
          logging: true,
          letterRendering: 1,
          allowTaint: false,
          useCORS: true,
        });
        const backCanvas = await html2canvas(backCardRef.current);
        const frontImgData = frontCanvas.toDataURL("image/jpeg");
        const backImgData = backCanvas.toDataURL("image/jpeg");
        setFrontImageUrl(frontImgData);
        setBackImageUrl(backImgData);
      }
    };
    console.log("capture");
    captureAsJpg();
  }, [thumbnailLoaded, nftInfo]);

  useEffect(() => {
    if (frontImageUrl && fromManageProject) {
      uploadImageHandler(frontImageUrl);
    }
  }, [fromManageProject, frontImageUrl]);

  console.log("frontImageUrl:", frontImageUrl);
  console.log("fromManageProject:", fromManageProject);
  console.log("thumbnailLoaded:", thumbnailLoaded);
  console.log("nftInfo.makerAddress:", nftInfo.makerAddress);

  const uploadImageHandler = async (dataUrl) => {
    const token = localStorage.getItem("token");
    const blob = dataURLtoBlob(dataUrl);

    try {
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");
      const response = await axios.post(
        `${API.NFTREGISTRY}/${project.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("NFT Image uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="flip-card my-6">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {frontImageUrl ? (
            <Card>
              <img src={frontImageUrl} alt="Captured Content" />
            </Card>
          ) : (
            <div
              ref={frontCardRef}
              className="w-full h-full flex items-center justify-center text-white ticket-bg"
            >
              <div className="w-full h-full ticket-bg-meteor flex flex-col items-center p-4">
                <img
                  src={thumbnailFromProject}
                  alt="project image"
                  className="w-full h-96 z-50 mb-3 object-cover rounded-lg"
                  onLoad={() => setThumbnailLoaded(true)}
                  onError={() => setThumbnailLoaded(false)}
                />
                <div className="w-full flex flex-col items-center mt-auto bg-white/50 p-4 rounded-lg text-black">
                  <Typography variant="h4" className="text-glow">
                    {project.title}
                  </Typography>
                  <Typography variant="small" className="text-glow">
                    {nftInfo.makerAddress}
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
        {backImageUrl ? (
          <div>
            <img src={backImageUrl} alt="Captured Content" />
          </div>
        ) : (
          <div ref={backCardRef} className="flip-card-back">
            <div className="w-full h-full flex items-center justify-center text-white ticket-bg">
              <div className="ticket-bg-meteor w-full h-full place-content-center">
                <div>
                  <Typography variant="h6" className="text-glow">
                    Project Name: {project.title}
                  </Typography>
                  <Typography variant="h6" className="text-glow">
                    Description: {project.description}
                  </Typography>
                  <Typography variant="h6" className="text-glow">
                    Creator: {project.contactEmail}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTTicket;

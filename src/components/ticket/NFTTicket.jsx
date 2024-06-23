import React, { useRef, useState, useEffect } from "react";
import "./NFTTicket.css";
import { Card, Typography } from "@material-tailwind/react";
import html2canvas from "html2canvas";

const NFTTicket = ({ project }) => {
  const [frontImageUrl, setFrontImageUrl] = useState("");
  const [backImageUrl, setBackImageUrl] = useState("");
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src =
        typeof project.thumbnail === "string"
          ? project.thumbnail
          : URL.createObjectURL(project.thumbnail);
      img.onload = () => {
        setThumbnailLoaded(true);
      };
    };

    if (project.thumbnail) {
      loadImage();
    }
  }, [project.thumbnail]);

  useEffect(() => {
    const captureAsJpg = async () => {
      if (thumbnailLoaded) {
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

    captureAsJpg();
  }, []);

  console.log(frontImageUrl);

  return (
    <div className="flip-card my-6">
      <div className="flip-card-inner ">
        <div className="flip-card-front ">
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
                  src={
                    typeof project.thumbnail === "string"
                      ? project.thumbnail
                      : URL.createObjectURL(project.thumbnail)
                  }
                  alt="project image"
                  className="w-full h-96 z-50 mb-3 object-cover rounded-lg"
                  onLoad={() => setThumbnailLoaded(true)}
                />
                <div className="w-full flex flex-col items-center justify-center mt-auto  bg-white/50 p-4 rounded-lg text-black">
                  <Typography variant="h4" className="text-glow">
                    {project.title}
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
          <div ref={backCardRef} className="flip-card-back ">
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

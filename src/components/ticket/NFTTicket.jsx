import React, { useRef, useState, useEffect } from "react";
import "./NFTTicket.css";
import { Card, Typography } from "@material-tailwind/react";
import html2canvas from "html2canvas";

const NFTTicket = ({ project }) => {
  const [frontImageUrl, setFrontImageUrl] = useState("");
  const [backImageUrl, setBackImageUrl] = useState("");
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  useEffect(() => {
    const captureAsJpg = async () => {
      const frontCanvas = await html2canvas(frontCardRef.current, {
        logging: true,
        letterRendering: 1,
        allowTaint: false,
        useCORS: false,
      });
      const backCanvas = await html2canvas(backCardRef.current);
      const frontImgData = frontCanvas.toDataURL("image/jpeg");
      const backImgData = backCanvas.toDataURL("image/jpeg");
      setFrontImageUrl(frontImgData);
      setBackImageUrl(backImgData);
    };
    captureAsJpg();
  }, []);

  return (
    <div className="flip-card my-12">
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
              <div className="w-full h-full ticket-bg-meteor">
                <img
                  src={project.thumbnail}
                  alt="project image"
                  className="w-140px z-50"
                />
                <Typography variant="h4" className="text-glow">
                  {project.title}
                </Typography>
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
            <div className="w-full h-full flex items-center justify-center  text-white ticket-bg">
              <div className="ticket-bg-meteor w-full h-full place-content-center">
                <div>
                  <Typography variant="h6" className="text-glow">
                    Project Name: {project.title}
                  </Typography>
                  <Typography variant="h6" className="text-glow">
                    Description: {project.description}
                  </Typography>
                  <Typography variant="h6" className="text-glow">
                    Creater: {project.contactEmail}
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
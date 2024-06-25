import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import mainlogo from "../../assets/itemizeLogo.png";
import "./statusBar.css";

export default function EcommerceCard({
  project,
  status,
  fullWidh,
  type,
  children,
}) {
  const navigate = useNavigate();
  const viewProjectDetails = (project) => {
    navigate(`/detail/${project.projectId}`, { state: { project } });
  };

  let timeLeft = null;

  if (project && project.deadLine) {
    const today = new Date();
    const projectTimeLine = new Date(project.deadLine);
    const timeDifference = projectTimeLine - today;

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    timeLeft = [daysLeft, hoursLeft, minutesLeft];
  }

  return (
    <button
      onClick={() => viewProjectDetails(project)}
      className="ease-in-out transition duration-300 transform hover:scale-105"
    >
      {type === "create" ? (
        children
      ) : (
        <>
          <Card
            className={`${
              fullWidh && "w-full"
            } max-h-[430px] bg-white/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg transition delay-75 duration-100 ease-in-out`}
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="mt-0 mx-0 overflow-hidden"
            >
              <img
                src={project.thumbnail ? project.thumbnail : mainlogo}
                alt="card-image"
                className="h-60 w-full object-scale-down"
              />
              {status && (
                <div className="flex w-full h-5 overflow-hidden font-sans text-xs font-medium flex-start bg-white">
                  <div
                    className="flex items-center h-full overflow-hidden bg-gradient-to-r from-pink-400 via-purple-600 to-deep-purple-700 rounded-b-lg animate-gradient-x"
                    style={{ width: `${status}%` }}
                  ></div>
                </div>
              )}
            </CardHeader>
            <CardBody className="!mb-0">
              <div className="mb-1 flex justify-start">
                <Typography color="black" variant="h5" className="font-medium">
                  {project.title}
                </Typography>
              </div>
              <div className="flex justify-start mb-1">
                {project.price && (
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-medium"
                  >
                    ${project.price}.00
                  </Typography>
                )}
              </div>
              {timeLeft && (
                <div className="flex justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-medium flex justify-start ml-1 text-gray-600"
                  >
                    {timeLeft[0] < 0 ? (
                      <>Closed</>
                    ) : (
                      <>
                        {timeLeft[0]} days {timeLeft[1]} hours {timeLeft[2]}{" "}
                        minutes left
                      </>
                    )}
                  </Typography>
                </div>
              )}
              <div className="flex justify-start mt-1">
                <Typography variant="small">{project.category}</Typography>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </button>
  );
}

import { useState } from "react";
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
  type,
  children,
  isMain,
}) {
  const navigate = useNavigate();
  const viewProjectDetails = (project, isClosed) => {
    if (isClosed) {
      navigate(`/ticket/${project.projectId}`, { state: { project } });
    } else {
      navigate(`/detail/${project.projectId}`, { state: { project } });
    }
  };
  const [showCategory, setShowCategory] = useState(false);

  let timeLeft = null;
  let isClosed = false;

  if (project && project.deadLine) {
    const today = new Date();
    const projectTimeLine = new Date(project.deadLine);
    const timeDifference = projectTimeLine - today;

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    timeLeft = [daysLeft, hoursLeft, minutesLeft];
    isClosed = daysLeft < 0;
  }

  const shortenWords = (str, length = 10) => {
    let result = "";
    if (str.length > length) {
      result = str.substr(0, length - 2) + "...";
    } else {
      result = str;
    }
    return result;
  };

  const projectTitle = project
    ? project.title.charAt(0).toUpperCase() + project.title.slice(1)
    : "Project title is null";

  return (
    <button
      onClick={() => viewProjectDetails(project, isClosed)}
      onMouseOver={() => setShowCategory(true)}
      onMouseOut={() => setShowCategory(false)}
      disabled={!project.title && true}
      className={`${
        !project.title
          ? "animate-pulse"
          : "hover:border-gray-300 hover:bg-white hover:shadow-xl"
      } w-full min-w-72 transform rounded-lg border border-transparent p-3 transition duration-300 ease-in-out`}
    >
      {type === "create" ? (
        children
      ) : (
        <>
          <Card
            className={`max-h-[430px] rounded-lg bg-transparent shadow-none transition delay-75 duration-100 ease-in-out`}
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="mx-0 mt-0 overflow-hidden rounded-lg p-0"
            >
              {project.title ? (
                <img
                  src={project.title ? project.thumbnail : mainlogo}
                  alt="card-image"
                  className={`h-44 w-full object-cover`}
                />
              ) : (
                <div className="h-44 w-full bg-gray-300"></div>
              )}

              {status && (
                <div className="flex-start flex w-full overflow-hidden bg-white font-sans text-xs font-medium">
                  <div
                    className={`flex h-3 items-center overflow-hidden bg-gradient-to-r ${
                      project.title
                        ? "from-purple-600 via-pink-400 to-deep-purple-600"
                        : "bg-gray-500"
                    } animate-gradient-x`}
                    style={{ width: `${status}%` }}
                  ></div>
                </div>
              )}
            </CardHeader>
            <CardBody className="!mb-0 py-2">
              {project.title ? (
                <>
                  <div className="mb-1 flex justify-start">
                    <Typography
                      color="black"
                      variant="h5"
                      className="font-medium"
                    >
                      {projectTitle}
                    </Typography>
                  </div>
                  <div className="mb-1 flex justify-start">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {project ? project.makerName : 0}
                    </Typography>
                  </div>
                  {timeLeft && (
                    <div className="flex justify-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
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
                        className="ml-1 font-medium text-gray-600"
                      >
                        {timeLeft[0] < 0 ? (
                          <>Closed</>
                        ) : (
                          <>
                            {isMain
                              ? shortenWords(
                                  timeLeft[0] +
                                    "days left •" +
                                    +status +
                                    "% funded",
                                  35,
                                )
                              : timeLeft[0] + "days • " + status + "% funded"}
                          </>
                        )}
                      </Typography>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="h-5 w-28 rounded-md bg-gray-300"></div>
                  <div className="mt-2 h-4 w-56 rounded-md bg-gray-300"></div>
                </>
              )}
              <div className="mt-1 flex justify-start">
                <div
                  className={`${
                    showCategory ? "bg-gray-100" : "bg-transparent"
                  } rounded-md px-2 py-1`}
                >
                  <Typography
                    variant="small"
                    className={`${
                      showCategory ? "text-purple-500" : "text-transparent"
                    } font-normal`}
                  >
                    {project ? project.category : "Project category is null"}
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </button>
  );
}

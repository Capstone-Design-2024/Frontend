import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import mainlogo from "../../assets/itemizeLogo.png";
import "./statusBar.css";
import axios from "axios";
import { API } from "../../config";

export default function EcommerceCard({ project, type, children, isMain }) {
  const [investorLength, setInvestorLength] = useState(-1);
  const investorCache = useRef({});
  const navigate = useNavigate();
  const [showCategory, setShowCategory] = useState(false);
  const [isFetchingInvestors, setIsFetchingInvestors] = useState(false); // State to track loading status

  // Fetch investors with caching to avoid redundant requests
  useEffect(() => {
    if (project && project.projectId) {
      if (investorCache.current[project.projectId]) {
        setInvestorLength(investorCache.current[project.projectId]);
      } else {
        const fetchInvestors = async () => {
          try {
            setIsFetchingInvestors(true); // Set loading state to true
            const data = { project_id: project.projectId };
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API.PROJECTBUYER}`, data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const length = response.data.result.length;
            investorCache.current[project.projectId] = length;
            setInvestorLength(length);
          } catch (error) {
            console.error("Fetching buyer error: ", error);
          } finally {
            setIsFetchingInvestors(false); // Set loading state to false
          }
        };
        fetchInvestors();
      }
    }
  }, [project]);

  // Memoized progress calculation
  const progress = useMemo(() => {
    return ((investorLength * project?.price) / project?.goalAmount) * 100;
  }, [investorLength, project?.price, project?.goalAmount]);

  // Memoized timeLeft and isClosed calculations
  const { timeLeft, isClosed } = useMemo(() => {
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

      return {
        timeLeft: [daysLeft, hoursLeft, minutesLeft],
        isClosed: daysLeft < 0,
      };
    }
    return { timeLeft: null, isClosed: false };
  }, [project]);

  // Memoized navigation callback
  const viewProjectDetails = useCallback(
    (project, isClosed) => {
      if (isClosed) {
        navigate(`/ticket/${project.projectId}`, { state: { project } });
      } else {
        navigate(`/detail/${project.projectId}`, { state: { project } });
      }
    },
    [navigate],
  );

  // Shorten words utility function
  const shortenWords = (str, length = 10) => {
    return str.length > length ? str.substr(0, length - 2) + "..." : str;
  };

  const projectTitle = useMemo(() => {
    return project && project.title
      ? project.title.charAt(0).toUpperCase() + project.title.slice(1)
      : "Project title is null";
  }, [project]);

  return (
    <button
      onClick={() => viewProjectDetails(project, isClosed)}
      onMouseOver={() => setShowCategory(true)}
      onMouseOut={() => setShowCategory(false)}
      disabled={!project?.title || isFetchingInvestors || investorLength < 0}
      className={`${
        !project?.title || isFetchingInvestors || investorLength < 0
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
              {!project?.title || isFetchingInvestors || investorLength < 0 ? (
                <div className="h-44 w-full bg-gray-300"></div>
              ) : (
                <img
                  src={project?.thumbnail || mainlogo}
                  alt="card-image"
                  className={`h-44 w-full object-cover`}
                />
              )}

              <div className="flex-start flex w-full overflow-hidden bg-white font-sans text-xs font-medium">
                {project?.title && (
                  <div
                    className={`animate-gradient-x flex h-3 items-center overflow-hidden bg-gradient-to-r ${
                      investorLength < 0 || isFetchingInvestors
                        ? "bg-gray-500"
                        : "from-purple-600 via-pink-400 to-deep-purple-600"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                )}
              </div>
            </CardHeader>
            <CardBody className="!mb-0 py-2">
              {!project?.title || isFetchingInvestors || investorLength < 0 ? (
                <>
                  <div className="h-5 w-28 rounded-md bg-gray-300"></div>
                  <div className="mt-2 h-4 w-56 rounded-md bg-gray-300"></div>
                </>
              ) : (
                <>
                  <div className="flex justify-start">
                    <Typography
                      color="black"
                      variant="small"
                      className="font-normal"
                    >
                      {projectTitle}
                    </Typography>
                  </div>
                  {/* <div className="mb-1 flex justify-start">
                    <Typography variant="small" className="font-normal">
                      {project?.makerName || "Unknown Maker"}
                    </Typography>
                  </div> */}
                  <div className="mb-1 flex justify-start">
                    <Typography variant="h5" className="font-medium text-black">
                      {project?.price || "Unknown Maker"}.00 PNP
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
                        ) : isMain ? (
                          shortenWords(
                            timeLeft[0] +
                              " days left • " +
                              progress +
                              "% funded",
                            35,
                          )
                        ) : (
                          timeLeft[0] + " days • " + progress + "% funded"
                        )}
                      </Typography>
                    </div>
                  )}
                </>
              )}
              {project?.title &&
                investorLength >= 0 &&
                !isFetchingInvestors && (
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
                        {project?.category || "Project category is null"}
                      </Typography>
                    </div>
                  </div>
                )}
            </CardBody>
          </Card>
        </>
      )}
    </button>
  );
}

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import mainlogo from "../../assets/itemizeLogo.png";
import "./statusBar.css";

export default function EcommerceCard({
  title,
  price,
  project,
  description,
  status,
  instruction,
  thumbnail,
  onClick,
  cardWidth,
  dayLeft,
  type,
  children,
}) {
  const navigate = useNavigate();
  const viewProjectDetails = (project) => {
    navigate(`/detail/${project.projectId}`, { state: { project } });
  };
  const width = !cardWidth && "300px";
  return (
    <Card
      className={`w-${width} bg-white/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg`}
    >
      {type === "create" ? (
        children
      ) : (
        <>
          <button onClick={() => viewProjectDetails(project)}>
            <CardHeader
              shadow={false}
              floated={false}
              className="mt-0 mx-0 overflow-hidden"
            >
              <img
                src={thumbnail ? thumbnail : mainlogo}
                alt="card-image"
                className="h-60 w-full object-scale-down"
              />
              {status && (
                <div className="flex w-full mt-2 h-5 overflow-hidden font-sans text-xs font-medium flex-start bg-white">
                  <div
                    className="flex items-center h-full overflow-hidden bg-gradient-to-r from-pink-400 via-purple-600 to-deep-purple-700 rounded-b-lg animate-gradient-x"
                    style={{ width: `${status}%` }}
                  ></div>
                </div>
              )}
            </CardHeader>
            <CardBody>
              <div className="mb-1 flex items-center justify-between">
                <Typography color="black" variant="h5" className="font-medium">
                  {title}
                </Typography>
                {price && (
                  <Typography color="blue-gray" className="font-medium">
                    {price}
                  </Typography>
                )}
              </div>
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
                  className="font-bold flex justify-start ml-1 text-gray-600"
                >
                  {dayLeft} days left
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75 flex justify-start mt-1"
              >
                {description}
              </Typography>
            </CardBody>
          </button>
          <CardFooter className="pt-0">
            <Button
              onClick={onClick}
              ripple={false}
              fullWidth={true}
              className="w-full !normal-case bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:bg-purple-600 hover:text-white focus:scale-105 focus:shadow-none active:scale-100 "
              disabled={instruction}
            >
              {instruction ? "Closed" : "Modify project"}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

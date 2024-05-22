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
}) {
  const navigate = useNavigate();
  const viewProjectDetails = (project) => {
    navigate(`/detail/${project.projectId}`, { state: { project } });
  };
  const width = !cardWidth && "2llpx";
  return (
    <Card
      className={`xl:w-63 min-w-${width} bg-white/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg`}
    >
      <button onClick={() => viewProjectDetails(project)}>
        <CardHeader shadow={false} floated={false} className="h-60">
          <img
            src={thumbnail ? thumbnail : mainlogo}
            alt="card-image"
            className="h-full w-full object-scale-down"
          />
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
        {status && (
          <div className="mb-2 flex w-full h-5 overflow-hidden font-sans text-xs font-medium rounded-lg flex-start bg-blue-gray-50">
            <div
              className={`flex items-center justify-center w-[${status}%] h-full overflow-hidden text-white break-all bg-purple-600 rounded-lg`}
            >
              {status}% Completed
            </div>
          </div>
        )}
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
    </Card>
  );
}

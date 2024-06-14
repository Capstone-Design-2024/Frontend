import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import ProjectImage from "../components/details/ProjectImage";
import ProjectTabs from "../components/details/ProjectTabs";
import formatPrice from "../utils/formatPrice";

export default function ProjectDetailPage({ isLoggedIn }) {
  const location = useLocation();
  const { project } = location.state;
  const navigate = useNavigate();

  return (
    <StickyNavbar isLoggedIn={isLoggedIn}>
      <div className="flex flex-col min-h-screen container mx-auto mt-7">
        <div className="flex justify-between items-center mb-6">
          <ProjectImage thumbnail={project.thumbnail} />
          <div className="">
            <Typography variant="h2" color="blue-gray">
              {project.title}
            </Typography>
            <Typography variant="h4" color="gray" className="mt-4 ">
              {formatPrice(project.price)}
            </Typography>
            <div className="flex space-x-2 mt-4">
              <Button
                variant="text"
                size="md"
                className="!normal-case flex justify-center space-x-2 bg-white border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <Typography className="font-bold">Add to Cart</Typography>
              </Button>
              <Button
                variant="text"
                size="md"
                className="flex justify-center space-x-2 !normal-case bg-purple-700 text-white hover:bg-purple-600"
                onClick={() => navigate("/fe/billing")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <Typography className="font-bold">Buy Now</Typography>
              </Button>
            </div>
          </div>
        </div>
        <ProjectTabs project={project} />
      </div>
      <div className="mt-6 mx-40 px-4 ">
        <FooterWithLogo />
      </div>
    </StickyNavbar>
  );
}

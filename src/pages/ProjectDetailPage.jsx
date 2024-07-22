import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Button,
  Tabs,
  Tab,
  TabsHeader,
} from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import ProjectImage from "../components/details/ProjectImage";
import ProjectTabs from "../components/details/ProjectTabs";
import formatPrice from "../utils/formatPrice";

import CheckoutModal from "../components/ui/CheckoutModal";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const intervals = {
  "1주일": [65, 59, 80, 81, 56, 55, 40],
  "1개월": [78, 68, 90, 85, 70, 65, 50, 60, 75, 80, 95, 100],
  "3개월": [90, 85, 80, 78, 82, 88, 92, 95, 90, 85, 80, 75],
  "6개월": [
    75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150,
    155, 160, 165, 170, 175, 180, 185, 190,
  ],
  전체: [
    100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170,
    175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245,
    250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320,
    325, 330, 335, 340, 345, 350, 355,
  ],
};

export default function ProjectDetailPage({ isLoggedIn }) {
  const location = useLocation();
  const { project } = location.state;
  const [open, setOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("1주일");

  const handleOpen = () => setOpen(!open);
  console.log(selectedInterval);

  const data = {
    labels: intervals[selectedInterval].map((_, index) => index + 1),
    datasets: [
      {
        label: "",
        data: intervals[selectedInterval],
        borderColor: "#6600CC",
        backgroundColor: "#6600CC",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false, // x축을 없앰
      },
      y: {
        position: "right", // y축을 오른쪽으로 이동
        grid: {
          display: false, // y축의 격자를 없앰 (원한다면)
        },
        beginAtZero: false,
        ticks: {
          padding: 10, // y축과 그래프 사이의 여백을 추가
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <StickyNavbar isLoggedIn={isLoggedIn}>
      <div className="flex flex-col min-h-screen container mx-auto mt-7">
        <div className="flex flex-col mb-6">
          <div className="flex justify-between gap-16 mt-8">
            <div className="w-1/2">
              <ProjectImage thumbnail={project.thumbnail} />
            </div>
            <div className="w-1/2 ml-4">
              <div>
                <Typography variant="h3" color="blue-gray">
                  {project.title}
                </Typography>
                <Typography variant="h4" color="gray" className="mt-4">
                  {formatPrice(project.price)}
                </Typography>
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="text"
                    size="md"
                    className="w-1/2 !normal-case flex justify-center space-x-2 bg-white border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
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
                    className="w-1/2 flex justify-center space-x-2 !normal-case bg-purple-700 text-white hover:bg-purple-600"
                    onClick={handleOpen}
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
              <div className="mt-6">
                <Tabs value={selectedInterval} className="mb-4">
                  <TabsHeader>
                    {Object.keys(intervals).map((interval) => (
                      <Tab
                        key={interval}
                        value={interval}
                        onClick={() => setSelectedInterval(interval)}
                      >
                        {interval}
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        <ProjectTabs project={project} />
      </div>
      <div className="mt-6 mx-40 px-4 ">
        <FooterWithLogo />
      </div>
      <CheckoutModal open={open} handler={handleOpen} project={project} />
    </StickyNavbar>
  );
}

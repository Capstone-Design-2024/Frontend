import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import logo from "../assets/itemizeLogo.png";
import { intervals } from "./constants";
import { chartOptions } from "./chartOptions";
import { getChartData } from "./chartData";
import axios from "axios";
import { API } from "../config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProjectDetailPage({ isLoggedIn, isClosed }) {
  const location = useLocation();
  const { project } = location.state;
  const [open, setOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("1 Week");
  const [selectedMenu, setSelectedMenu] = useState("Traded");
  const [priceHistory, setPriceHistory] = useState({
    Traded: [{ "Traded Price": "", Date: "" }],
    Asked: [{ "Asked Price": "", Date: "" }],
    Bided: [{ "Bided Price": "", Date: "" }],
  });

  useEffect(() => {
    const fetchAuctionData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API.GETAUCTION}/${project.projectId}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const askedData = response.data.data
          .map((item) =>
            item.type === "ASK"
              ? {
                  "Asked Price": item.priceForAuction,
                  Date: "2024/09/25",
                }
              : false
          )
          .filter(Boolean)
          .slice(0, 8);

        console.log("askedData", askedData);

        const bidedData = response.data.data
          .map((item) =>
            item.type === "BID"
              ? {
                  "Bided Price": item.priceForAuction,
                  Date: "2024/09/25",
                }
              : false
          )
          .filter(Boolean)
          .slice(0, 8);

        setPriceHistory((prevHistory) => ({
          ...prevHistory,
          Asked: askedData,
          Bided: bidedData,
        }));
      } catch (error) {
        console.log("Error fetching auction data:", error);
      }
    };

    fetchAuctionData();
  }, [project.projectId]);

  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);

  const data = getChartData(selectedInterval);

  const viewTrading = (project, type) => {
    if (type === "Bid") {
      navigate(`/bid/${project.projectId}`, {
        state: { project },
      });
    } else {
      navigate(`/ask/${project.projectId}`, {
        state: { project },
      });
    }
  };

  return (
    <StickyNavbar isLoggedIn={isLoggedIn}>
      <div className="flex flex-col min-h-screen container mx-auto mt-7">
        <div className="flex flex-col mb-6">
          <div className="flex justify-between space-x-9 mt-8">
            <div className="w-1/2 h-[500px] aspect-square bg-gray-50">
              <ProjectImage
                thumbnail={project.thumbnail ? project.thumbnail : logo}
              />
            </div>
            <div className="w-1/2 border-l-[1px] pl-9">
              <div>
                <Typography>{!isClosed ? "Price" : "Lowest Ask"}</Typography>
                <Typography variant="h3" color="gray">
                  {project.price ? formatPrice(project.price) : "99.99 PNP"}
                </Typography>
                <Typography variant="lead" color="blue-gray" className="mt-4">
                  {project.title ? project.title : "Test Product"}
                </Typography>
                {isClosed ? (
                  <div>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="text"
                        size="md"
                        className="w-1/2 !normal-case flex justify-center space-x-2 bg-red-500 hover:bg-red-400"
                        onClick={() => viewTrading(project, "Bid")}
                      >
                        <Typography className="font-bold text-white">
                          Buy
                        </Typography>
                      </Button>
                      <Button
                        variant="text"
                        size="md"
                        className="w-1/2 flex justify-center space-x-2 !normal-case bg-green-500 hover:bg-green-400"
                        onClick={() => viewTrading(project, "Ask")}
                      >
                        <Typography className="font-bold text-white">
                          Sell
                        </Typography>
                      </Button>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
              {isClosed && (
                <div className="mt-6">
                  <Typography variant="lead" className="font-medium">
                    Trading History
                  </Typography>
                  <Tabs value={selectedInterval} className="my-4">
                    <TabsHeader>
                      {Object.keys(intervals).map((interval) => (
                        <Tab
                          key={interval}
                          value={interval}
                          onClick={() => setSelectedInterval(interval)}
                          className={`${
                            selectedInterval === interval &&
                            "font-medium text-black"
                          } `}
                        >
                          {interval}
                        </Tab>
                      ))}
                    </TabsHeader>
                  </Tabs>
                  <div style={{ height: "170px" }}>
                    <Line data={data} options={chartOptions} />
                  </div>
                  <Tabs value={selectedMenu} className="mt-16 mb-4">
                    <TabsHeader>
                      {Object.keys(priceHistory).map((menu) => (
                        <Tab
                          key={menu}
                          value={menu}
                          onClick={() => setSelectedMenu(menu)}
                          className={`${
                            selectedMenu === menu && "font-medium text-black"
                          } `}
                        >
                          {menu}
                        </Tab>
                      ))}
                    </TabsHeader>
                  </Tabs>
                  <div className="px-2">
                    <div className="flex justify-between">
                      <Typography className="font-medium">
                        {selectedMenu + " Price"}
                      </Typography>
                      <Typography className="font-medium">Date</Typography>
                    </div>
                    <hr className="my-2" />
                    {priceHistory[selectedMenu].map((price, idx) => (
                      <div className="flex justify-between" key={idx}>
                        <Typography>
                          {price[selectedMenu + " Price"]
                            ? price[selectedMenu + " Price"].toLocaleString() +
                              " PNP"
                            : "-"}
                        </Typography>
                        <Typography>
                          {price["Date"] ? price["Date"] : "-"}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ProjectTabs project={project} />
        </div>
      </div>
      <div className="mt-6 mx-40 px-4 ">
        <FooterWithLogo />
      </div>
      <CheckoutModal open={open} handler={handleOpen} project={project} />
    </StickyNavbar>
  );
}

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import ProjectImage from "../components/details/ProjectImage";
import ProjectTabs from "../components/details/ProjectTabs";
import formatPrice from "../utils/formatPrice";
import CheckoutModal from "../components/ui/CheckoutModal";
import logo from "../assets/itemizeLogo.png";
import axios from "axios";
import { API } from "../config";
import TabsComponent from "../components/ui/TabsComponent";
import SteppedLineChart from "../components/SteppedLineChart"; // Adjust the path accordingly

export const intervals = {
  "1 Week": [],
  "1 Month": [],
  "3 Months": [],
  "6 Months": [],
  All: [],
};

const useProjectData = (projectId, token) => {
  const [investors, setInvestors] = useState([]);
  const [priceHistory, setPriceHistory] = useState({
    Traded: [{ "Traded Price": "", Date: "" }],
    Asked: [{ "Asked Price": "", Date: "" }],
    Bided: [{ "Bided Price": "", Date: "" }],
  });
  const [isMyProject, setIsMyProject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [investorsResponse, auctionResponse, myProjectResponse] =
          await Promise.all([
            axios.post(`${API.PROJECTBUYER}`, { project_id: projectId }),
            axios.get(`${API.GETAUCTION}/${projectId}`, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${API.ISMYPROJECT}/${projectId}`, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        if (investorsResponse.data?.result?.length !== 0) {
          setInvestors(investorsResponse.data.result);
        }

        const askedData = auctionResponse.data.data
          .filter((item) => item.type === "ASK")
          .map((item) => ({
            "Asked Price": item.priceForAuction,
            Date: new Date(item.date).toLocaleDateString(),
          }))
          .slice(0, 8);

        const bidedData = auctionResponse.data.data
          .filter((item) => item.type === "BID")
          .map((item) => ({
            "Bided Price": item.priceForAuction,
            Date: new Date(item.date).toLocaleDateString(),
          }))
          .slice(0, 8);

        setPriceHistory((prevHistory) => ({
          ...prevHistory,
          Asked: askedData.length > 0 ? askedData : prevHistory.Asked,
          Bided: bidedData.length > 0 ? bidedData : prevHistory.Bided,
        }));

        setIsMyProject(myProjectResponse.data.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [projectId, token]);

  return { investors, priceHistory, isMyProject };
};

export default function ProjectDetailPage({ isLoggedIn, isClosed }) {
  const location = useLocation();
  const { project } = location.state;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { investors, priceHistory, isMyProject } = useProjectData(
    project.projectId,
    token,
  );
  const [open, setOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("All");
  const [selectedMenu, setSelectedMenu] = useState("Traded");

  const handleOpen = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  const viewTrading = useCallback(
    (project, type) => {
      if (type === "Bid") {
        navigate(`/bid/${project.projectId}`, {
          state: { project },
        });
      } else {
        navigate(`/ask/${project.projectId}`, {
          state: { project },
        });
      }
    },
    [navigate],
  );

  return (
    <StickyNavbar isLoggedIn={isLoggedIn}>
      <div className="mx-64 mt-7 flex min-h-screen flex-col">
        <div className="mb-6 flex flex-col">
          <div className="mt-8 flex justify-between space-x-16">
            <div className="aspect-square h-[400px] max-h-screen w-8/12 bg-gray-50">
              <ProjectImage
                thumbnail={project.thumbnail ? project.thumbnail : logo}
              />
              <div className="mt-10">
                <ProjectTabs project={project} />
              </div>
            </div>
            <div className="w-5/12">
              <Typography className="font-lg font-normal text-gray-500">
                {project.category ? project.category : "99.99 PNP"}
              </Typography>
              <Typography
                color="blue-gray"
                className="my-2 text-2xl font-medium text-black"
              >
                {project.title ? project.title : "Test Product"}
              </Typography>
              <div className="flex items-center justify-start space-x-3">
                <div className="flex items-center justify-start space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-yellow-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography className="text-sm font-semibold">5.0</Typography>
                  <Typography className="text-sm font-medium text-gray-500">
                    (29)
                  </Typography>
                </div>
                <div className="flex justify-start space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                      clipRule="evenodd"
                    />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                  <Typography className="text-sm font-medium text-gray-600">
                    {investors?.length ? investors.length : 0} Users are funding
                  </Typography>
                </div>
              </div>
              <Typography variant="h3" className="mt-6 text-black">
                {project.price ? formatPrice(project.price) : "99.99 PNP"}
              </Typography>
              <div className="mt-7 rounded-md border border-gray-300 p-4">
                <div className="flex items-center justify-start space-x-3">
                  <Avatar
                    variant="circular"
                    alt="reviewer"
                    src={logo}
                    className="h-10 w-10"
                  />
                  <div className="flex w-full justify-between">
                    <div>
                      <Typography className="text-sm font-semibold">
                        {project.makerName}
                      </Typography>
                      <Typography className="text-sm font-medium text-purple-600">
                        3000 followers
                      </Typography>
                    </div>
                    <Button
                      size="sm"
                      className="bg-purple-700 !normal-case text-white"
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              </div>

              {isClosed ? (
                <div>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant="text"
                      size="sm"
                      className="flex w-1/2 justify-center space-x-2 bg-red-500 !normal-case hover:bg-red-400"
                      onClick={() => viewTrading(project, "Bid")}
                    >
                      <Typography className="font-bold text-white">
                        Buy
                      </Typography>
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      className="flex w-1/2 justify-center space-x-2 bg-green-500 !normal-case hover:bg-green-400"
                      onClick={() => viewTrading(project, "Ask")}
                    >
                      <Typography className="font-bold text-white">
                        Sell
                      </Typography>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="text"
                    size="sm"
                    className="flex w-1/2 items-center justify-center space-x-2 border border-purple-700 bg-white !normal-case text-purple-700 hover:bg-purple-700 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
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
                    size="sm"
                    className="flex w-1/2 items-center justify-center space-x-2 bg-purple-700 !normal-case text-white hover:bg-purple-600"
                    onClick={handleOpen}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
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
              {isMyProject && (
                <div className="my-4">
                  <Typography variant="lead" className="font-medium">
                    Funding History
                  </Typography>
                  <div className="flex justify-between">
                    <Typography className="font-medium">Name</Typography>
                    <Typography className="font-medium">Address</Typography>
                  </div>
                  <hr className="my-2" />
                  {investors?.length ? (
                    investors?.map((investor, idx) => (
                      <div className="flex justify-between" key={idx}>
                        <Typography className="font-medium">
                          {investor["name"] ? investor["name"] : "-"}
                        </Typography>
                        <Typography className="font-medium">
                          {investor["address"] ? investor["address"] : "-"}
                        </Typography>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between">
                      <Typography className="font-medium">{"-"}</Typography>
                      <Typography className="font-medium">{"-"}</Typography>
                    </div>
                  )}
                  <hr className="my-2" />
                </div>
              )}
              <div className="relative">
                {!isClosed && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-md py-7 text-xl font-bold">
                    <Typography
                      variant="lead"
                      className="rounded-md p-2 px-3 font-semibold"
                    >
                      This project is still in funding phase
                    </Typography>
                  </div>
                )}

                <div className={`${!isClosed && "blur-sm"} mt-6`}>
                  <Typography variant="lead" className="font-medium">
                    Trading History
                  </Typography>
                  <TabsComponent
                    tabs={intervals}
                    selectedTab={selectedInterval}
                    setSelectedTab={setSelectedInterval}
                  />
                  <div style={{ height: "170px" }}>
                    <SteppedLineChart
                      data={priceHistory.Asked.map(
                        (item) => item["Asked Price"],
                      )}
                      labels={priceHistory.Asked.map((item) => item.Date)}
                    />
                  </div>
                  <TabsComponent
                    tabs={priceHistory}
                    selectedTab={selectedMenu}
                    setSelectedTab={setSelectedMenu}
                  />
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-40 mt-24 px-4">
        <FooterWithLogo />
      </div>
      <CheckoutModal open={open} handler={handleOpen} project={project} />
    </StickyNavbar>
  );
}

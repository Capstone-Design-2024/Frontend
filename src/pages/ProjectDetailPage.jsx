import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  IconButton,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
  Tooltip,
  Button, // Import Button
} from "@material-tailwind/react";
import {
  HomeIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function ProjectDetailPage({ isLoggedIn }) {
  const location = useLocation();
  const { project } = location.state;
  const tabsData = [
    {
      label: "Description",
      value: "description",
      content: project.description,
    },
    {
      label: "Specifications",
      value: "specifications",
      content: "Here are the detailed specifications of the product.",
    },
    {
      label: "Reviews",
      value: "reviews",
      content: "Customer reviews will be displayed here.",
    },
  ];

  const timelineData = [
    {
      icon: HomeIcon,
      title: "Launch",
      description: "The product was launched in 2021.",
    },
    {
      icon: BellIcon,
      title: "Update",
      description: "Received major updates in 2022.",
    },
    {
      icon: CurrencyDollarIcon,
      title: "Milestone",
      description: "Achieved 1 million sales in 2023.",
    },
  ];

  const navigate = useNavigate();

  return (
    <StickyNavbar isLoggedIn={isLoggedIn}>
      <div className="flex flex-col min-h-screen container mx-auto mt-7">
        <div className="flex justify-between items-center mb-6">
          <img
            src={project.thumbnail}
            alt="Product"
            className="w-8/12 rounded-lg shadow-lg"
          />
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
                onClick={() => navigate("/billing")}
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
        <Tabs value="description">
          <TabsHeader>
            {tabsData.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabsData.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                <Typography>{content}</Typography>
                {value === "specifications" && (
                  <Card className="h-full w-full overflow-scroll mt-4">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Name
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              Value
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Repeat for each specification */}
                        <tr>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              Weight
                            </Typography>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              1.2kg
                            </Typography>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                )}
                {value === "reviews" && (
                  <List className="mt-4">
                    <ListItem>
                      <ListItemPrefix>
                        <Avatar
                          variant="circular"
                          alt="reviewer"
                          src="https://docs.material-tailwind.com/img/face-1.jpg"
                        />
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          Reviewer Name
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          This product is fantastic! It exceeded my
                          expectations.
                        </Typography>
                      </div>
                      <ListItemSuffix>
                        <Tooltip content="5 Stars" placement="top">
                          <span className="text-yellow-500">★★★★★</span>
                        </Tooltip>
                      </ListItemSuffix>
                    </ListItem>
                  </List>
                )}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div className="mt-6 mx-40 px-4 ">
        <FooterWithLogo />
      </div>
    </StickyNavbar>
  );
}

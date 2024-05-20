import { useLocation } from "react-router-dom";
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
} from "@material-tailwind/react";
import {
  HomeIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import StickyNavbar from "../components/ui/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";

export default function ProjectDetailPage({ isLoggedIn }) {
  const location = useLocation();
  const { project } = location.state;
  const tabsData = [
    {
      label: "Description",
      value: "description",
      content:
        "This is a detailed description of the product. It includes all the features and benefits of using this product.",
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

  return (
    <div>
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible  ">
        <StickyNavbar isLoggedIn={isLoggedIn}>
          <div className="flex flex-col min-h-screen container mx-auto mt-5">
            <div className="flex justify-between items-center mb-6">
              <img
                src={project.thumbnail}
                alt="Product"
                className="w-3/5 rounded-lg shadow-lg"
              />
              <div className="">
                <Typography variant="h2" color="blue-gray">
                  {project.title}
                </Typography>
                <Typography variant="lead" color="gray" className="mt-4">
                  {project.description}
                </Typography>
                <IconButton size="lg">
                  <i className="fas fa-heart fa-lg" />
                </IconButton>
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
                            {/* Add more specifications as needed */}
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
                        {/* Add more reviews as needed */}
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
      </div>
    </div>
  );
}

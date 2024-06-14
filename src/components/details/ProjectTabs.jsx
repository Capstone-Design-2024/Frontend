import React from "react";
import {
  Typography,
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
import NFTTicket from "../ticket/NFTTicket";

const ProjectTabs = ({ project }) => {
  const tabsData = [
    {
      label: "Description",
      value: "description",
      content: project.description,
    },
    {
      label: "Ticket",
      value: "ticket",
      content: "Ticket of the product",
    },
    {
      label: "Reviews",
      value: "reviews",
      content: "Customer reviews will be displayed here.",
    },
  ];

  return (
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
            {value !== "ticket" && <Typography>{content}</Typography>}
            {value === "ticket" && (
              <div className="flex justify-center">
                <NFTTicket project={project} />
              </div>
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
                      This product is fantastic! It exceeded my expectations.
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
  );
};

export default ProjectTabs;

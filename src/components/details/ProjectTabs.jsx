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
      content: "",
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
            {value === "description" && (
              <div>
                <h1>
                  <strong>
                    Sleek Wireless Bluetooth Speaker with 360° Sound – Compact &
                    Portable
                  </strong>
                </h1>
                <p>
                  Experience powerful, room-filling sound with this sleek
                  wireless Bluetooth speaker, designed for music lovers on the
                  go. Its compact design makes it portable while delivering
                  immersive 360° sound that ensures no corner of the room is
                  left silent. Perfect for parties, outdoor adventures, or
                  simply relaxing at home, this Bluetooth speaker combines style
                  with high-performance audio technology.
                </p>

                <h2>
                  <strong>Features:</strong>
                </h2>
                <ul>
                  <li>
                    <strong>360° Surround Sound:</strong> Enjoy rich, clear
                    sound from every angle.
                  </li>
                  <li>
                    <strong>Compact & Portable:</strong> Easily fits in your
                    bag, ideal for travel or outdoor use.
                  </li>
                  <li>
                    <strong>Bluetooth 5.0 Connectivity:</strong> Seamlessly
                    pairs with any Bluetooth-enabled device.
                  </li>
                  <li>
                    <strong>12-Hour Battery Life:</strong> Keep the music going
                    all day without interruptions.
                  </li>
                  <li>
                    <strong>Water-Resistant Design:</strong> Perfect for
                    poolside parties or beach trips.
                  </li>
                  <li>
                    <strong>Built-in Microphone:</strong> Hands-free calls with
                    crystal clear voice quality.
                  </li>
                </ul>

                <h2>
                  <strong>Why You Should Buy:</strong>
                </h2>
                <p>
                  This wireless Bluetooth speaker offers the perfect blend of
                  functionality, portability, and style. Whether you're throwing
                  a party or need background tunes for your workspace, its
                  powerful audio output and long battery life make it a
                  must-have gadget. Plus, with its sleek, modern design, it
                  looks great in any setting.
                </p>
              </div>
            )}
            {value !== "ticket" && <Typography>{content}</Typography>}
            {value === "ticket" && (
              <div className="flex justify-center">
                <NFTTicket project={project} fromManageProject={false} />
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

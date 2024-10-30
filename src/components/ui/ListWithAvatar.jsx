import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import logo from "../../assets/itemizeLogo.png";

import React from "react";

export default function ListWithAvatar({ ticket, loading, children }) {
  return (
    <Card className="w-full bg-white/85 p-4 shadow-2xl">
      <List className="max-h-[300px] overflow-y-auto">
        <p className="mt-2 pl-4 text-xl font-medium text-gray-800">Asset</p>
        {loading ? (
          <ListItem>
            <ListItemPrefix>
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-400" />
            </ListItemPrefix>
            <div className="space-y-1">
              <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
              <div className="flex justify-start gap-1">
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
              </div>
              <div className="flex justify-start gap-1">
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-400"></div>
              </div>
            </div>
          </ListItem>
        ) : ticket.length === 0 ? (
          children
        ) : (
          ticket.map((proj, index) => (
            <ListItem
              key={index}
              onClick={() => {
                window.open(`${proj.uri}`, "_blank");
              }}
              className="min-h-24"
            >
              <ListItemPrefix>
                <div className="rounded-md bg-gray-300 p-0.5">
                  <img
                    className="h-16 w-12 rounded-md"
                    src={proj.image ? proj.image : logo}
                  />
                </div>
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {proj.name ? proj.name : "Test Product"}
                </Typography>
                <div className="flex justify-start gap-1">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Description:
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-purple-700"
                  >
                    {proj.description
                      ? proj.description
                      : "No description available"}
                  </Typography>
                </div>
                <div className="flex justify-start gap-1">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Price:
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-purple-700"
                  >
                    {proj.price ? proj.price : "0"}
                  </Typography>
                </div>
              </div>
            </ListItem>
          ))
        )}
      </List>
    </Card>
  );
}

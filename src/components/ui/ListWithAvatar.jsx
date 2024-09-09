import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import logo from "../../assets/itemizeLogo.png";

export default function ListWithAvatar({ project, walletAddress }) {
  return (
    <Card className="w-full p-2 bg-white/35 shadow-2xl">
      <List>
        <p className="text-xl text-gray-800 font-medium pl-4 mt-2">Tickets</p>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="logo" src={logo} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              {project ? project.title : "Test Product"}
            </Typography>
            <div className="flex justify-start gap-1">
              <Typography variant="small" color="gray" className="font-normal">
                From
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-purple-700"
              >
                {walletAddress
                  ? walletAddress
                  : "A94A8FE5CCB19BA61C4C0873D391E987982FBBD3"}
              </Typography>
            </div>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}

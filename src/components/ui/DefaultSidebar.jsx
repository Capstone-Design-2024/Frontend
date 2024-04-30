import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import mainlogo from "../../assets/itemizeLogo.png";

export function DefaultSidebar({ setCurrent }) {
  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <a href="/">
          <img src={mainlogo} alt="Itemize Logo" className="w-24 mb-6 ml-1" />
        </a>
        <Typography variant="h5" color="blue-gray">
          Project Management
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => setCurrent("Project Information")}>
          Project Information
        </ListItem>
        <ListItem onClick={() => setCurrent("Basic Information")}>
          Basic Information
        </ListItem>
        <ListItem onClick={() => setCurrent("Story Line")}>Story Line</ListItem>
        <ListItem onClick={() => setCurrent("Creater Information")}>
          Creater Information
        </ListItem>
      </List>
    </Card>
  );
}

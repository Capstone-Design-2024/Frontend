import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";
import logoWithName from "../../assets/LogoWithName.png";

export function DefaultSidebar({
  setCurrent,
  availability,
  buttonAvailability,
  onSubmit,
}) {
  return (
    <Card className="h-lvh w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <a href="/">
          <img
            src={logoWithName}
            alt="Itemize Logo"
            className="mb-4 ml-1 w-40"
          />
        </a>
        <Typography variant="h5" color="blue-gray">
          Project Management
        </Typography>
      </div>
      <List>
        <ListItem
          onClick={() => setCurrent("Project Information")}
          disabled={availability.projectInfo}
        >
          Project Information
        </ListItem>
        <ListItem
          onClick={() => setCurrent("Basic Information")}
          disabled={availability.basicInfo}
        >
          Basic Information
        </ListItem>
        <ListItem
          onClick={() => setCurrent("Story Line")}
          disabled={availability.storyLine}
        >
          Story Line
        </ListItem>
        <ListItem
          onClick={() => setCurrent("Creater Information")}
          disabled={availability.createrInfo}
        >
          Creater Information
        </ListItem>
      </List>
      <Button
        className="border border-purple-700 bg-white text-sm !normal-case text-purple-700 hover:bg-purple-700 hover:text-white"
        disabled={buttonAvailability}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Card>
  );
}

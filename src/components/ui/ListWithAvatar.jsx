import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

export default function ListWithAvatar() {
  return (
    <Card className="w-full p-2 bg-white/35 shadow-2xl">
      <List>
        <p className="text-xl text-gray-800 font-medium pl-4 mt-2">Tickets</p>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="candice"
              src="https://docs.material-tailwind.com/img/face-1.jpg"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Tania Andrew
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Software Engineer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="alexander"
              src="https://docs.material-tailwind.com/img/face-2.jpg"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Alexander
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Backend Developer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="emma"
              src="https://docs.material-tailwind.com/img/face-3.jpg"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Emma Willever
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              UI/UX Designer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}

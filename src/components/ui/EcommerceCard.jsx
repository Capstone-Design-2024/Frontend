import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function EcommerceCard({
  title,
  price,
  description,
  status,
  instruction,
  onClick,
}) {
  return (
    <Card className="xl:w-63 m-3 min-w-[211px]">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-1 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {title}
          </Typography>
          {price && (
            <Typography color="blue-gray" className="font-medium">
              {price}
            </Typography>
          )}
        </div>

        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        {status && (
          <div className="mb-2 flex w-full h-4 overflow-hidden font-sans text-xs font-medium rounded-lg flex-start bg-blue-gray-50">
            <div className="flex items-center justify-center w-1/2 h-full overflow-hidden text-white break-all bg-purple-600 rounded-lg">
              {status}% Completed
            </div>
          </div>
        )}
        <Button
          onClick={onClick}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none hover:bg-purple-600 hover:text-white focus:scale-105 focus:shadow-none active:scale-100"
        >
          {instruction}
        </Button>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  ListItemSuffix,
} from "@material-tailwind/react";

export default function OrderSummary() {
  const items = [
    {
      src: "https://via.placeholder.com/50",
      alt: "Product 1",
      name: "Product 1",
      price: "$50.00",
      qty: "1x",
    },
    {
      src: "https://via.placeholder.com/50",
      alt: "Product 2",
      name: "Product 2",
      price: "$75.00",
      qty: "1x",
    },
  ];

  return (
    <Card color="transparent" shadow={false} className="mb-6">
      <Typography variant="h5" color="blue-gray" className="mb-6">
        Order Summary
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemPrefix>
              <Avatar src={item.src} alt={item.alt} variant="square" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {item.price}
              </Typography>
            </div>
            <ListItemSuffix>
              <Typography variant="small" color="blue-gray">
                {item.qty}
              </Typography>
            </ListItemSuffix>
          </ListItem>
        ))}
        <ListItem className="border-t mt-4">
          <div className="flex justify-between w-full">
            <Typography variant="h6" color="blue-gray">
              Total
            </Typography>
            <Typography variant="h6" color="blue-gray">
              $125.00
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}

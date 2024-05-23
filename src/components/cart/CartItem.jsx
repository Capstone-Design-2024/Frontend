import {
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <ListItem>
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
      <ListItemSuffix className="flex items-center space-x-2">
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <MinusIcon className="w-5 h-5" />
        </IconButton>
        <Typography variant="small" color="blue-gray">
          {item.quantity}
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <PlusIcon className="w-5 h-5" />
        </IconButton>
        <IconButton
          variant="text"
          color="red"
          onClick={() => onRemove(item.id)}
        >
          <TrashIcon className="w-5 h-5" />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
  );
}

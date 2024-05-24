import React, { useState } from "react";
import { Card, Typography, Button, List } from "@material-tailwind/react";
import CartItem from "../components/cart/CartItem";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";

export default function CartPage() {
  const initialItems = [
    {
      id: 1,
      src: "https://via.placeholder.com/50",
      alt: "Product 1",
      name: "Product 1",
      price: "$50.00",
      quantity: 1,
    },
    {
      id: 2,
      src: "https://via.placeholder.com/50",
      alt: "Product 2",
      name: "Product 2",
      price: "$75.00",
      quantity: 1,
    },
  ];

  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );

  return (
    <StickyNavbar>
      <div className="container mx-auto p-4">
        <Typography variant="h2" color="blue-gray" className="mb-6 mt-2">
          Your Cart
        </Typography>
        <Card color="transparent" shadow={false} className="mb-6">
          <List>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </List>
          <div className="flex justify-between mt-6 p-4 border-t">
            <Typography variant="h5" color="blue-gray">
              Total:
            </Typography>
            <Typography variant="h5" color="blue-gray">
              ${totalPrice.toFixed(2)}
            </Typography>
          </div>
          <Button className="mt-6 !normal-case font-medium" size="md" fullWidth>
            Proceed to Checkout
          </Button>
        </Card>
      </div>
    </StickyNavbar>
  );
}

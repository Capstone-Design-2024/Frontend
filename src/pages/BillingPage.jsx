import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import PersonalInformationForm from "../components/billing/PersonalInformationForm";
import PaymentMethodForm from "../components/billing/PaymentMethodForm";
import OrderSummary from "../components/billing/OrderSummary";
import ConfirmationDialog from "../components/billing/ConfirmationDialog";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";

export default function BillingPage({ isLoggedIn }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);

  return (
    <StickyNavbar isLoggedIn={isLoggedIn}>
      <div className="container mx-auto p-4 ">
        <Typography variant="h2" color="blue-gray" className="mb-6 mt-2">
          Billing Information
        </Typography>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4">
            <PersonalInformationForm />
            <PaymentMethodForm handleOpenDialog={handleOpenDialog} />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <OrderSummary />
          </div>
        </div>
        <ConfirmationDialog open={openDialog} handleOpen={handleOpenDialog} />
      </div>
    </StickyNavbar>
  );
}

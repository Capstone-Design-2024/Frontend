import {
  Card,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export default function PaymentMethodForm({ handleOpenDialog }) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h5" color="blue-gray" className="mb-6">
        Payment Method
      </Typography>
      <form className="space-y-4">
        <Input label="Card Number" size="lg" type="text" />
        <div className="flex space-x-4">
          <Input label="Expiration Date" size="lg" type="text" />
          <Input label="CVV" size="lg" type="text" />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree to the
              <a href="#" className="font-medium text-gray-900 ml-1">
                Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button
          className="mt-6 !normal-case font-medium"
          fullWidth
          onClick={handleOpenDialog}
        >
          Confirm Payment
        </Button>
      </form>
    </Card>
  );
}

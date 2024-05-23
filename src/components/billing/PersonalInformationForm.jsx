import { Card, Typography, Input } from "@material-tailwind/react";

export default function PersonalInformationForm() {
  return (
    <Card color="transparent" shadow={false} className="mb-6">
      <Typography variant="h5" color="blue-gray" className="mb-6">
        Personal Information
      </Typography>
      <form className="space-y-4">
        <Input label="Full Name" size="lg" />
        <Input label="Email Address" size="lg" type="email" />
        <Input label="Phone Number" size="lg" type="tel" />
        <Input label="Address" size="lg" />
        <Input label="City" size="lg" />
        <Input label="State" size="lg" />
        <Input label="Postal Code" size="lg" />
      </form>
    </Card>
  );
}

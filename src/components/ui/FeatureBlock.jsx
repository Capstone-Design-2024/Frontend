import React from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import feature1 from "../../assets/feature1.webp";
import feature2 from "../../assets/feature2.png";
import feature3 from "../../assets/feature3.webp";
import feature4 from "../../assets/feature4.webp";

export default function FeatureBlock() {
  return (
    <section className="pb-10 px-8">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Features
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-4 !text-2xl font-bold lg:!text-4xl"
        >
          Turn your idea into a startup
        </Typography>
        <Typography variant="lead" className="mx-auto max-w-lg !text-gray-500">
          We&apos;re constantly trying to express ourselves and actualize our
          dreams. If you have the opportunity to play
        </Typography>
      </div>
      <div className="mb-8 container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card
          className="col-span-1 bg-gray-100/50 overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Decentralized Trust
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Ensure transparent and secure crowdfunding with blockchain,
              eliminating fraud and building trust
            </Typography>
            <div className="justify-center flex">
              <img
                src={feature1}
                alt="decentralized trust"
                className="w-[300px] xl:h-[370px] lg:h-[360px] lg:translate-y-8 translate-y-7 object-scale-down object-center"
              />
            </div>
          </CardBody>
        </Card>
        <Card
          className="col-span-2 bg-gray-100/50 overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Smart Contract Automation
            </Typography>
            <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Automate funding, rewards, and dispute resolution with smart
              contracts for a seamless experience
            </Typography>
            <img
              src={feature2}
              alt="laptop"
              className="w-full lg:h-[380px] md:h-[300px] h-[220px] lg:translate-y-16 translate-y-10 object-scale-down object-center"
            />
          </CardBody>
        </Card>
      </div>
      <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
        <Card
          className="col-span-2 bg-gray-100/50 overflow-hidden"
          shadow={false}
        >
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Global Accessibility
            </Typography>
            <Typography className="text-center max-w-sm mx-auto text-base font-normal leading-7 !text-gray-500">
              Enable global participation without intermediaries, making
              crowdfunding accessible to everyone
            </Typography>
            <div className="flex justify-center">
              <img
                src={feature3}
                alt="laptop"
                className="w-[400px] xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] lg:translate-y-6 translate-y-10 object-cover object-center"
              />
            </div>
          </CardBody>
        </Card>
        <Card className="col-span-1 bg-gray-100/50" shadow={false}>
          <CardBody className="text-center">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Tokenized Rewards
            </Typography>
            <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              Offer unique digital tokens as rewards, adding value and fostering
              a loyal community of supporters
            </Typography>
            <div className="flex justify-center">
              <img
                src={feature4}
                alt="laptop"
                className="w-[250px] xl:h-[355px] lg:h-[380px] md:h-[300px] h-[180px] lg:translate-y-6 translate-y-10 object-scale-down object-center"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

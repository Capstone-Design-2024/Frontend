import { Carousel, Typography, Button } from "@material-tailwind/react";
import carousel1 from "../../assets/carousel1.webp";
import carousel2 from "../../assets/carousel2.webp";
import carousel3 from "../../assets/carousel3.webp";

export default function CarouselWithContent() {
  return (
    <Carousel className="h-[500px] overflow-hidden">
      <div className="relative h-full w-full">
        <img
          src={carousel2}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/45">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Transforming Ideas into Reality
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Unlock the potential of your projects with our secure,
              transparent, and decentralized crowdfunding platform. Powered by
              blockchain technology, we ensure trust and efficiency in every
              transaction. Join us to fund your dreams, support innovative
              ideas, and be part of a global community driving change. Whether
              you're an entrepreneur seeking funding or a backer looking for the
              next big thing, Blockchain Crowdfund is your gateway to the future
              of crowdfunding.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button
                size="lg"
                color="white"
                className="bg-gradient-to-br from-deep-purple-700 to-deep-purple-900  text-white !normal-case"
              >
                Explore
              </Button>
              <Button
                size="lg"
                color="white"
                variant="text"
                className="!normal-case"
              >
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={carousel1}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/45">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Empower Your Vision with Blockchain Crowdfund
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              At Itemize, we believe in the power of community-driven
              innovation. Our platform leverages cutting-edge blockchain
              technology to offer a transparent, secure, and efficient way to
              raise funds. Whether you’re launching a new product, supporting a
              cause, or investing in groundbreaking ideas, our decentralized
              system ensures trust and accountability every step of the way.
              Start your journey with us and turn your vision into reality.
            </Typography>
            <div className="flex gap-2">
              <Button
                size="lg"
                color="white"
                className="bg-gradient-to-br from-deep-purple-700 to-deep-purple-900 text-white !normal-case"
              >
                Explore
              </Button>
              <Button
                size="lg"
                color="white"
                variant="text"
                className="!normal-case"
              >
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={carousel3}
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/45">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32 pt-12">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Revolutionize Funding with Itemize
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to the future of crowdfunding. Blockchain Crowdfund is
              your premier destination for secure, transparent, and
              decentralized fundraising. By utilizing the power of blockchain,
              we eliminate middlemen, reduce costs, and provide unparalleled
              transparency. Whether you're an innovator, an entrepreneur, or a
              supporter, our platform connects you with a global network ready
              to back the next big idea. Join us and be part of the crowdfunding
              revolution.
            </Typography>
            <div className="flex gap-2">
              <Button
                size="lg"
                color="white"
                className="bg-gradient-to-br from-deep-purple-700 to-deep-purple-900 text-white !normal-case"
              >
                Explore
              </Button>
              <Button
                size="lg"
                color="white"
                variant="text"
                className="!normal-case"
              >
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

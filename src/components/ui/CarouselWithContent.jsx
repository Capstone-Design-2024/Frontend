import { Carousel, Typography, Button } from "@material-tailwind/react";
import carousel1 from "../../assets/carousel1.avif";
import carousel2 from "../../assets/carousel2.jpeg";
import carousel3 from "../../assets/carousel3.jpeg";

export default function CarouselWithContent() {
  return (
    <Carousel>
      <div className="relative h-full w-full">
        <img
          src={carousel1}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
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
          src={carousel2}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
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
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
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

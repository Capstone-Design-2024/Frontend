import { Carousel, Typography, Button } from "@material-tailwind/react";
import carousel1 from "../../assets/carousel1.webp";
import carousel2 from "../../assets/carousel2.webp";
import carousel3 from "../../assets/carousel3.webp";

export default function CarouselWithContent() {
  const contents = [
    {
      source: carousel1,
      title: "Transforming Ideas into Reality",
      description:
        "Unlock the potential of your projects with our secure,transparent, and decentralized crowdfunding platform. Powered by blockchain technology, we ensure trust and efficiency in every transaction.",
    },
    {
      source: carousel2,
      title: "Empower Your Vision with Blockchain Crowdfund",
      description:
        "At Itemize, we believe in the power of community-driven innovation. Our platform leverages cutting-edge blockchain technology to offer a transparent, secure, and efficient way to raise funds.",
    },
    {
      source: carousel3,
      title: "Revolutionize Funding with Itemize",
      description:
        "Welcome to the future of crowdfunding. Blockchain Crowdfund is your premier destination for secure, transparent, and decentralized fundraising. By utilizing the power of blockchain, we eliminate middlemen, reduce costs, and provide unparalleled transparency.",
    },
  ];
  return (
    <div className="mt-5 lg:mx-64">
      <Carousel
        className="h-[400px] overflow-hidden rounded-lg sm:h-[500px] md:h-[650px] lg:h-[400px]"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-12 bg-white" : "w-6 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {contents.map((content, idx) => (
          <div className="relative h-full w-full" key={idx}>
            <img
              src={content.source}
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/30">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h6"
                  color="white"
                  className="mb-4 text-xl md:text-3xl lg:text-4xl"
                >
                  {content.title}
                </Typography>
                <Typography
                  variant="paragraph"
                  color="white"
                  className="mb-12 opacity-80"
                >
                  {content.description}
                </Typography>
                <div className="flex justify-center gap-2">
                  <Button
                    size="lg"
                    color="white"
                    className="bg-gradient-to-br from-deep-purple-700 to-deep-purple-900 !normal-case text-white"
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
        ))}
      </Carousel>
    </div>
  );
}

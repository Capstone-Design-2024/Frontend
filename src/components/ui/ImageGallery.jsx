import React from "react";
import { Card, Typography } from "@material-tailwind/react";

export function ImageGallery() {
  return (
    <div className="relative flex items-center">
      <div
        className="flex overflow-x-scroll gap-4 scrollbar-hide p-4"
        style={{ scrollBehavior: "smooth" }}
      >
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 1" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 1
          </Typography>
        </Card>
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 2" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 2
          </Typography>
        </Card>
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 3" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 3
          </Typography>
        </Card>
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 3" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 3
          </Typography>
        </Card>
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 3" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 3
          </Typography>
        </Card>
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 3" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 3
          </Typography>
        </Card>
        <Card className="min-w-[300px]">
          <img src="https://via.placeholder.com/300" alt="Placeholder 3" />
          <Typography variant="h6" className="mt-2 text-center">
            Image 3
          </Typography>
        </Card>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}

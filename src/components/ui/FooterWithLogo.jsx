import { Typography } from "@material-tailwind/react";
import mainlogo from "../../assets/itemizeLogo.png";
import logoWithName from "../../assets/LogoWithName.png";

export default function FooterWithLogo() {
  const footerContents = ["About Us", "License", "Contribute", "Contact Us"];
  return (
    <footer className="w-full pt-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center md:justify-between">
        <a href="/fe/">
          <img src={logoWithName} alt="main-logo" className="w-[150px]" />
        </a>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {footerContents.map((content, index) => (
            <li key={index}>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-purple-600 focus:text-purple-600"
              >
                {content}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 Itemize
      </Typography>
    </footer>
  );
}

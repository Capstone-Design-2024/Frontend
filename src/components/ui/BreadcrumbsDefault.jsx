import { Breadcrumbs } from "@material-tailwind/react";

export default function BreadcrumbsDefault({ current }) {
  return (
    <Breadcrumbs>
      <p className="opacity-60">Project Management</p>
      <a href="#" className="text-gray-700 hover:text-purple-700">
        {current}
      </a>
    </Breadcrumbs>
  );
}

import { Breadcrumbs } from "@material-tailwind/react";

export default function BreadcrumbsDefault({ current }) {
  return (
    <Breadcrumbs>
      <a href="#" className="opacity-60">
        Project Management
      </a>
      <a href="#">{current}</a>
    </Breadcrumbs>
  );
}

import React from "react";
import ProjectDetailPage from "./ProjectDetailPage";

const TicketTransactionPage = ({ isLoggedIn }) => {
  return <ProjectDetailPage isClosed={true} isLoggedIn={isLoggedIn} />;
};

export default TicketTransactionPage;

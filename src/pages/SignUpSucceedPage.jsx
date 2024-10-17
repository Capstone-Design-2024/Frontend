import React from "react";
import MembershipBg from "../components/ui/MembershipBg";
import Card from "../components/ui/Card";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SignUpSucceedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <MembershipBg></MembershipBg>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <Card title={"Sign up succeed!"}>
          <Button
            fullWidth
            className="mt-2 bg-purple-600 !normal-case"
            onClick={() => navigate("/login")}
          >
            Click to log in
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignUpSucceedPage;

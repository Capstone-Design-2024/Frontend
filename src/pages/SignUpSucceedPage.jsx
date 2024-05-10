import React from "react";
import MembershipBg from "../components/ui/MembershipBg";
import Card from "../components/ui/Card";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SignUpSucceedPage = () => {
  const navigate = useNavigate();
  return (
    <MembershipBg>
      <Card title={"Sign up succeed!"} width={"w-500px"}>
        <Button
          fullWidth
          className="mt-2 bg-purple-600"
          onClick={() => navigate("/login")}
        >
          Click to log in
        </Button>
      </Card>
    </MembershipBg>
  );
};

export default SignUpSucceedPage;

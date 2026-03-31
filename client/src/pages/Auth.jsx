import { useState } from "react";

//components
import Signup from "../components/Signup";
import Login from "../components/Login";

export default function Auth() {
  const { account, setAccount } = useState(false);
  return (
    <div className="w-full min-h-screen max-w-150 mx-auto  flex justify-center items-center">
      <div className="w-full h-auto border border-card-border p-4 rounded-(--border-radius) py-12">
        {account ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

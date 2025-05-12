import { useState } from "react";
import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import axios from "axios";
import { Endpoints, StorageKeys } from "../config";
import { Link, useNavigate } from "react-router-dom";
import HeaderText from "../components/HeaderText";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-black/95 flex flex-col items-center justify-around">
      <HeaderText />
      <div className="w-120 p-4 text-white flex flex-col items-center neon-glow-card">
        <p className="text-2xl font-semibold text-neon/80">Login</p>
        <LabelledInput onChange={(v) => {
          setEmail(v.target.value);
        }} label="Email" hintText="johndoe@gmail.com" />
        <LabelledInput onChange={(v) => {
          setPassword(v.target.value);
        }} label="Password" isPassword={true} hintText="********" />
        <Button
          classes="my-4"
          onClick={async () => {
            try {
              const res = await axios.post(
                Endpoints.signin,
                { email, password }
              );

              if (res.data.success) {
                localStorage.setItem(StorageKeys.userToken, res.data.data.token);
                navigate("/dashboard");
              }
            } catch (error) {
              console.error(error);

            }
          }}>
          Login
        </Button>
        <p className="text-gray-400 text-md"><em>Don't have an account? <Link to={"/signup"} className="underline">Signup</Link></em></p>
      </div>

      <div></div>
    </div>
  );
}

export default Signin;
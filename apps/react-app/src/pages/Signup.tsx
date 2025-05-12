import { useState } from "react";
import Button from "../components/Button";
import LabelledInput from "../components/LabelledInput";
import axios from "axios";
import { Endpoints, StorageKeys } from "../config";
import { Link, useNavigate } from "react-router-dom";
import HeaderText from "../components/HeaderText";

// TODO: SNACKBAR

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    return (
      <div className="w-full h-screen bg-black/95 flex flex-col items-center justify-around">
        <HeaderText />
        <div className="w-120 p-4 rounded-xl bg-black border-4 border-gray-900 hover:border-neon/40 hover:shadow-lg hover:shadow-neon/30 text-white transition duration-200 flex flex-col items-center">
          <p className="text-2xl font-semibold text-neon/80">Register</p>
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
                  Endpoints.signup,
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
            Register
          </Button>
          <p className="text-gray-400 text-md"><em>Already have an account? <Link to={"/signin"} className="underline">Login</Link></em></p>
        </div>
  
        <div></div>
      </div>
    );
}

export default Signup;
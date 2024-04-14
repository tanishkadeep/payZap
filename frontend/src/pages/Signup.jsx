import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 flex justify-center items-center w-full h-screen">
      <div className="flex flex-col bg-white w-1/4 justify-center items-center rounded-md py-5">
        <Heading heading={"Sign up"} />
        <Subheading text={"Enter your information to create an account"} />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          title={"First Name"}
          placeholder={"John"}
          type={"text"}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          title={"Last Name"}
          placeholder={"Doe"}
          type={"text"}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          title={"Email"}
          placeholder={"user@email.com"}
          type={"email"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          title={"Password"}
          placeholder={"password"}
          type={"password"}
        />
        <ButtonComponent
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signup",
              {
                username,
                password,
                firstName,
                lastName,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard")
          }}
          text={"Sign up"}
        />
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};

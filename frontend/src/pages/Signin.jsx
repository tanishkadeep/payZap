import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
  return (
    <div className="bg-slate-300 flex justify-center items-center w-full h-screen">
      <div className="flex flex-col bg-white w-1/4 justify-center items-center rounded-md py-5">
        <Heading heading={"Sign in"} />
        <Subheading text={"Enter your credentials to access your account"} />
        <InputBox title={"Email"} placeholder={"user@email.com"} type={"email"}/>
        <InputBox title={"Password"} placeholder={"password"} type={"password"}/>
        <ButtonComponent text={"Sign in"}/>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  );
};

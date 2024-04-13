import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";

export const Signup = () => {
  return (
    <div className="bg-slate-300 flex justify-center items-center w-full h-screen">
      <div className="flex flex-col bg-white w-1/4 justify-center items-center rounded-md py-5">
        <Heading heading={"Sign up"} />
        <Subheading text={"Enter your information to create an account"} />
        <InputBox title={"First Name"} placeholder={"John"} type={"text"}/>
        <InputBox title={"Last Name"} placeholder={"Doe"} type={"text"}/>
        <InputBox title={"Email"} placeholder={"user@email.com"} type={"email"}/>
        <InputBox title={"Password"} placeholder={"password"} type={"password"}/>
        <ButtonComponent text={"Sign up"}/>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  );
};

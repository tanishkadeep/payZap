import { InputBox } from "../components/InputBox";
import { ButtonComponent } from "../components/ButtonComponent";

export const SendMoney = () => {
  return (
    <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
      <div className="bg-white w-1/3 flex flex-col justify-center items-center rounded-md py-10">
        <div className="text-4xl font-extrabold pb-5">Send Money</div>
        <div className="flex items-center  my-5">
          <div className="rounded-full flex justify-center items-center cursor-pointer bg-slate-200 h-11 w-11">
            <div className="text-xl font-medium"> A</div>
          </div>
          <div className="pl-4 font-bold text-2xl">John Doe</div>
        </div>
        <InputBox
          title={"Amount (in Rs)"}
          placeholder={"Enter amount"}
          type={"text"}
        />
        <ButtonComponent text={"Initiate Transfer"} />
      </div>
    </div>
  );
};

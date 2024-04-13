import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="px-32 py-10">
      <Appbar />
      <Balance balance={"10,000"} />
      <Users />
    </div>
  );
};

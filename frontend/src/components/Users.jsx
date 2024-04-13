import { useState } from "react";
import { ButtonComponent } from "./ButtonComponent";

export const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Harkirat",
      lastName: "Singh",
      _id: 1,
    },
  ]);

  return (
    <div className="px-10">
      <div className="font-bold text-xl">Users</div>
      <input
        className="mt-4 px-2 py-1 rounded outline-2 outline-gray-300 outline w-full"
        type="text"
        name=""
        id=""
        placeholder="Search users..."
      />
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between items-center font-medium">
      <div className="flex items-center mt-6">
        <div className="rounded-full flex justify-center items-center cursor-pointer bg-slate-200 h-11 w-11">
          <div className=""> {user.firstName[0]}</div>
        </div>
        <div className="pl-4">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="w-40 flex justify-center items-center text-sm">
        <ButtonComponent text={"Send Money"} />
      </div>
    </div>
  );
}

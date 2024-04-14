import { useEffect, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="px-10">
      <div className="font-bold text-xl">Users</div>
      <input
        className="mt-4 px-2 py-1 rounded outline-2 outline-gray-300 outline w-full"
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
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
  const navigate = useNavigate();

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
        <ButtonComponent
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          text={"Send Money"}
        />
      </div>
    </div>
  );
}

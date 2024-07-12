import moment from "moment";
import { getInitials } from "../../utils";
import clsx from "clsx";

export default function UserTable({ users }) {
  // console.log(users);
  const TableHeader = () => (
    <thead className="border-b border-gray-300 ">
      <tr className="text-black text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200  text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-[#003175]">
            <span className="text-center">
              {getInitials(user?.fName, user?.lName)}
            </span>
          </div>

          <div>
            <p className="text-sm">
              {user.fName} {user.lName}
            </p>
            <span className="text-xs text-black">{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(

            "w-max-fit p-2 rounded-full text-xs flex justify-center items-center",
            user?.isLoggedIn
              ? "bg-green-400 text-black"
              : "bg-red-400 text-white"
          )}
        >
          <span className="text-[0.7rem] text-center">{user?.isLoggedIn ? "Active" : "Not-Active"}</span>
        </p>
      </td>
      <td className="pl-1 text-sm">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-2xl rounded-xl">
      <table className="w-full mb-5">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

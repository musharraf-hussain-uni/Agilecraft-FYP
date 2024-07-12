import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
// import { summary } from "../../assets/data";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { MdCheck } from "react-icons/md";
import { useGetAllUser } from "../../hooks/get-user";

const UserList = ({ setTeam, team }) => {
  const { data } = useGetAllUser();
  const [selectedUsers, setSelectedUsers] = useState([]);

  console.log(data);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el?.map((u) => u._id));
  };
  useEffect(() => {
    if (team?.length < 1) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(team);
    }
  }, []);

  return (
    <div>
      <p className="text-indigo-900 font-bold border px-2 py-1 mb-1 max-w-fit bg-slate-100 rounded-full mt-2">
        Assign Task To:{" "}
      </p>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className="relative my-2">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
            <span className="block truncate text-black">
              {selectedUsers?.map((user) => user.fName).join(", ")}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4. ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    } `
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={clsx(
                          "flex items-center gap-2 truncate",
                          selected ? "font-medium" : "font-normal"
                        )}
                      >
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                          <span className="text-center text-[10px]">
                            {getInitials(user.fName)}
                          </span>
                        </div>
                        <span className="">{user.email}</span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;

import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import { data } from "../../data/data";
import Charts from "../../components/Chart/Chart";
import BoardLayout from "./Layout";
import TaskTable from "../../components/WidgetLg/TaskTable";
import { summary } from "../../assets/data";
import UserTable from "../../components/WidgetSm/UserTable";
import {
  useGetAllUserDash,
  useGetUser,
  useGetUserTask,
} from "../../hooks/get-user";

const AdminDashboard = () => {
  const { users } = useGetAllUserDash();
  const { user } = useGetUser();
  const { userTask, loading } = useGetUserTask();

  let role = user?.role;

  let condition = role === "admin";

  return (
    <BoardLayout>
      <div className={`px:4 md:px-8 lg:px-12 xl:px-24 xxl:px-36 bg-[#F2F4F7]`}>
        <FeaturedInfo />
        <div className="px-4 md:px-8 lg:px-12 xl:px-6 xxl:px-12">
          <h1 className="font-bold text-3xl my-12">Information by Charts</h1>
        </div>
        <Charts title="User Analytics" grid dataKey="Active-User" />
        <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
          <TaskTable tasks={userTask} loading={loading} />
          {condition && <UserTable users={users} />}
        </div>
      </div>
    </BoardLayout>
  );
};

export default AdminDashboard;

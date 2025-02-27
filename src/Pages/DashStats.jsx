import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuth from "../Hooks/UseAuth";

const DashStats = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: stats = {} } = useQuery({
    queryKey: ["statsData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/getStats/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  const { data: Title = [] } = useQuery({
    queryKey: ["titleData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/recentTask/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  console.log(Title);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>
        </header>

        {/* Task Overview Section */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="totalTask bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">Total Tasks</h3>
            <p className="text-2xl font-bold text-white">
              {stats?.totalTask || 0}
            </p>
          </div>
          <div className="totalPending bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">
              Completed Tasks
            </h3>
            <p className="text-2xl font-bold text-white">
              {stats?.totalComplete || 0}
            </p>
          </div>
          <div className="totalComplete bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center flex-col gap-1">
            <h3 className="text-lg font-semibold text-white">Pending</h3>
            <p className="text-2xl font-bold text-white">
              {stats?.totalInProgress || 0}
            </p>
          </div>
        </section>

        {/* Recent Tasks List */}
        <section className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Tasks
          </h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <ul>
              {Title?.map((data, index) => (
                <li key={index} className=" bg-gray-200 my-2 p-2 rounded-lg">
                  {data.title}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashStats;

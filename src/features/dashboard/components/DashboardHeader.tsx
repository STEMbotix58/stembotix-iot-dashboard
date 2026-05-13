import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">IoT Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor devices and realtime telemetry data
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;

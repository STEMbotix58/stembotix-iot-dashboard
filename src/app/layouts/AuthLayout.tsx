import { Outlet } from "react-router-dom";
import STEMbotixLogo from "@/shared/assets/logo.svg";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Left Side: Brand & Visuals */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-[#2c2872] p-12 lg:flex">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10">
          {/* LOGO PLACEHOLDER */}
          <img src={STEMbotixLogo} alt="Logo" className="w-50 mb-5" />

          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Manage your edge <br />
            <span className="text-[#ec642b]">infrastructure.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-slate-300">
            A high-performance interface for real-time device monitoring, OTA
            updates, and automated fleet management.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <p className="text-sm text-slate-300">
            © 2026 STEMbotix IoT Platform
          </p>
          {/* <a
            href="#"
            className="text-sm text-slate-500 hover:text-white transition"
          >
            Status
          </a>
          <a
            href="#"
            className="text-sm text-slate-500 hover:text-white transition"
          >
            Docs
          </a> */}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

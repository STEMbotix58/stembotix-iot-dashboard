import LoginForm from "../components/LoginForm";
import STEMbotixLogo from "@/shared/assets/logo.svg";

const LoginPage = () => {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-10 lg:hidden">
          <img src={STEMbotixLogo} alt="Logo" className="w-70 mb-5" />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-slate-500">
            Enter your credentials to access the console.
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a href="#" className="font-semibold text-blue-600 hover:underline">
            Contact an administrator
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

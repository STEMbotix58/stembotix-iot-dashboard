import STEMbotixLogo from "@/shared/assets/logo.svg";

const AuthHeader = () => {
  return (
    <div className="mb-8">
      <img src={STEMbotixLogo} className="w-40 mb-4" />

      <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>

      <p className="mt-2 text-slate-500">
        Enter your credentials to access the console.
      </p>
    </div>
  );
};

export default AuthHeader;

import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import PasswordInput from "./PasswordInput";
import { useSelector } from "react-redux";
import { selectAuthLoading, selectAuth } from "../store/auth.selector";

const LoginForm = () => {
  const { login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector(selectAuth);
  const loading = useSelector(selectAuthLoading);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          type="email"
          required
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-700">
            Password
          </label>
          <button
            type="button"
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </button>
        </div>
        <PasswordInput value={password} onChange={setPassword} />
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
          Remember Me
        </label>
      </div>
      {error && (
        <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 active:scale-[0.98]"
      >
        {loading ? "Signing In..." : "Sign In to Dashboard"}
      </button>
    </form>
  );
};

export default LoginForm;

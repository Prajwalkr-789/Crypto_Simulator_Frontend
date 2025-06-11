"use client";
import React from "react";

import { LogIn } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toastUtils } from "@/utils/toastUtils";
import { useAuth } from "@/Contexts/AuthState"; 

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const { login } = useAuth(); 
  const [userformdata, setUserFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = userformdata;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !password) {
      toastUtils.showInfo("Please fill all the fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      toastUtils.showInfo("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toastUtils.showInfo("Password must be at least 6 characters long.");
      return;
    }

    const data: FormData = { email, password };
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => {
            return status >= 200 && status < 500; 
          }
        }
      );
  
      if (response.status === 200) {
        login(response.data.username);
        toastUtils.showMessage("Login successful.");
        router.push("/"); 
      } else {
        toastUtils.showError(response.data.errors || "An error occurred.");
        return;
      }
  
    } catch {
      toastUtils.showError("Something went wrong. Please try again.");
      return;
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-black">
      <div className="w-full border border-gray-500 max-w-sm p-6 space-y-9  rounded-lg shadow-lg">
        <div>
          <LogIn className="w-8 h-8 mx-auto text-gray-200 rounded-full  " />

          <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        </div>

        <form className="space-y-8">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"

              className="w-full border border-gray-300 px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your email"
              required
              value={userformdata.email}
              onChange={(e) =>
                setUserFormData({ ...userformdata, email: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={userformdata.password}
              className="w-full border border-gray-300 px-4 py-2 mt-1 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your password"
              required
              onChange={(e) =>
                setUserFormData({ ...userformdata, password: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full px-4 py-2 font-semibold text-zinc-800 bg-zinc-200 rounded-md hover:bg-zinc-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default Page;

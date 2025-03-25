import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // Import the spinner

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true); // Start loading

    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        setLoading(false); // Stop loading
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl items-center text-blue-600 font-bold">
          Messenger
        </h1>
        <h2 className="text-2xl items-center">
          Login with your{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        {/* Submit Button with Spinner */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2 flex items-center justify-center"
          >
            {loading ? <ClipLoader size={20} color="#ffffff" /> : "Login"}
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-500 underline cursor-pointer ml-1"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

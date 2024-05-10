"use client";
import React, { FormEvent, useEffect } from "react";
import Link from "next/link";
import appwriteService from "@/appwrite/appwriteConfig";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button, FormLabel, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import toast from "react-hot-toast";

type FormInput = {
  email: string;
  password: string;
};

const defaultValues: FormInput = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();

  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const onSubmit = async (data: FormInput) => {
    try {
      const session = await appwriteService.login(data);
      if (session) {
        setAuthStatus(true);
        router.push("/");
        toast.success("Login Successful");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="flex items-center justify-center h-screen w-full">
      <div className="flex items-center justify-center w-full h-full bg-primaryLight px-4">
        <div
          className={`mx-auto w-full max-w-lg bg-white rounded-xl px-5 py-10 sm:py-16 sm:px-10 shadow-lg`}
        >
          <div className="mb-4 flex justify-center items-center bg-primaryColor p-2 rounded-lg ">
            <Image src={"/logoWhite.png"} alt="Logo" width={280} height={80} />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-primaryColor">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor="email"
                  className="!font-semibold !text-primaryDark"
                >
                  Email address
                </FormLabel>
                <TextField
                  className="flex w-full text-primaryDark bg-white rounded-md border border-white placeholder:text-gray-500 focus:outline-none outline-none focus:ring-white focus:ring-0 focus:ring-offset-0"
                  type="email"
                  placeholder="Email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor="password"
                  className="!font-semibold !text-primaryDark"
                >
                  Password
                </FormLabel>
                <TextField
                  className="flex w-full text-primaryDark rounded-md border border-white bg-white placeholder:text-gray-500 focus:outline-none outline-none focus:ring-0 focus:ring-white focus:ring-offset-0"
                  type="password"
                  placeholder="Password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full text-xl items-center justify-center rounded-md px-3.5 py-3 mt-5 font-semibold leading-7 cursor-pointer saveBtn capitalize"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

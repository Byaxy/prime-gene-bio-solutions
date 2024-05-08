"use client";
import React, { FormEvent, useEffect } from "react";
import Link from "next/link";
import appwriteService from "@/appwrite/config";
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
      <div className="flex items-center justify-center w-full h-full bg-primaryLight">
        <div
          className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg`}
        >
          <div className="mb-2 flex justify-center items-center">
            <Image src={"/Logo.png"} alt="Logo" width={280} height={80} />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-primaryDark">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor="email"
                  className="text-base font-semibold text-primaryDark"
                >
                  Email address
                </FormLabel>
                <TextField
                  className="flex w-full rounded-md border border-grayColor bg-transparent text-sm placeholder:text-gray-500 focus:outline-none outline-none focus:ring-0 focus:ring-offset-0"
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
                  className="text-base font-semibold text-primaryDark"
                >
                  Password
                </FormLabel>
                <TextField
                  className="flex w-full rounded-md border border-grayColor bg-transparent text-sm placeholder:text-gray-500 focus:outline-none outline-none focus:ring-0 focus:ring-gray-500 focus:ring-offset-0"
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
                <Button
                  variant="contained"
                  type="submit"
                  className="inline-flex w-full text-xl items-center justify-center rounded-md bg-primaryDark px-3.5 py-3 mt-5 font-semibold leading-7 cursor-pointer text-white hover:bg-primaryDark/95 capitalize"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  size="large"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

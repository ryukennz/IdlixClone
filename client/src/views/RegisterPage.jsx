import { useState } from "react";
import axios from "../utils/axios";
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white flex max-w-4xl rounded-2xl">
        <div className="sm:w-1/2 py-12 px-12">
          <h2 className="p-4 text-black font-bold text-4xl">Sign up</h2>
          <form className="flex flex-col gap-4">
            <input
              className="w-full p-4 bg-slate-100 rounded-xl mt-1"
              type="text"
              placeholder="First name"
            />
            <input
              className="w-full p-4 bg-slate-100 rounded-xl"
              type="text"
              placeholder="Last name"
            />
            <input
              className="w-full p-4 bg-slate-100 rounded-xl"
              type="text"
              placeholder="Username"
            />
            <input
              className="w-full p-4 bg-slate-100 rounded-xl"
              type="email"
              placeholder="Email"
            />
            <input
              className="w-full p-4 bg-slate-100 rounded-xl"
              type="password"
              placeholder="Password"
            />
            <button
              className="w-full p-4 bg-black rounded-xl text-white text-xl"
              type="submit"
            >
              Sign up
            </button>

            <div className="p-2 flex justify-between">
              <h5 className="">Already have an account?</h5>
              <button type="button">Sign in</button>
            </div>
          </form>
        </div>
        <div className="sm:block hidden w-1/2 p-4">
          <img
            className=" ounded-xl"
            src="https://images.unsplash.com/photo-1714646542331-278803db302f?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
}

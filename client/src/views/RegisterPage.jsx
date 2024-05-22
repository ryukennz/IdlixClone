import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SubmitBtn from "../components/SubmitBtn";
import img from '../assets/sign_in_up_img.jpeg'


export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "/api/register",
        data: register,
      });
      response.status === 201 ? toast.success(response.data.message) && navigate("/login") : null;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white flex md:flex-row max-w-4xl rounded-2xl">
          <div className="sm:w-1/2 py-12 px-12">
            <h2 className="p-4 text-black font-bold text-4xl">Sign up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                onChange={handleChange}
                value={register.firstName}
                name="firstName"
                className="w-full p-4 bg-slate-100 rounded-xl mt-1"
                type="text"
                placeholder="First name"
              />
              <input
                onChange={handleChange}
                value={register.lastName}
                name="lastName"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="text"
                placeholder="Last name"
              />
              <input
                onChange={handleChange}
                value={register.username}
                name="username"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="text"
                placeholder="Username"
              />
              <input
                onChange={handleChange}
                value={register.email}
                name="email"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={handleChange}
                value={register.password}
                name="password"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="password"
                placeholder="Password"
              />

              <SubmitBtn />
              <div className="lg:p-2 flex justify-between">
                <h5>Already have an account?</h5>
                <Link to="/login">
                  <button
                    className="hover:underline hover:text-blue-600"
                    type="button"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </div>
          <div className="sm:block hidden w-1/2 p-4">
            <img
              className="rounded-xl shadow-2xl"
              src={img}
            />
          </div>
        </div>
      </div>
    </>
  );
}

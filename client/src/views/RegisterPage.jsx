import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      // console.log(response, "<<CEK");
      toast.success(response.data.message)
      // setRegister(data.result);
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white flex max-w-4xl rounded-2xl">
          <div className="sm:w-1/2 py-12 px-12">
            <h2 className="p-4 text-black font-bold font-[] text-4xl">
              Sign up
            </h2>
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
              <button
                className="w-full p-4 bg-black rounded-xl text-white text-xl"
                type="submit"
              >
                Sign up
              </button>

              <div className="sm:grid-col p-2 flex justify-between">
                <h5>Already have an account?</h5>
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
    </>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import SubmitBtn from "../components/SubmitBtn";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import img from '../assets/sign_in_up_img.jpeg'
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });


  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "/api/login",
        data: login,
      });
      localStorage.setItem("user_authentication", response.data.accessToken);
      response.status === 200 ? toast.success(`Login success`) && <Link to={'/'}></Link>  : null;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white flex md:flex-row max-w-4xl rounded-2xl">
          <div className="sm:w-1/2 py-24 px-14">
            <h2 className="p-4 text-black font-bold font-[] text-4xl">
              Sign in
            </h2>
            <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-6">
              <input
                onChange={handleChange}
                value={login.username}
                name="username"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="text"
                placeholder="Username"
              />
              <input
                onChange={handleChange}
                value={login.password}
                name="password"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="password"
                placeholder="Password"
              />

              <SubmitBtn />
              <div className="p-2 flex justify-between">
                <p>Already have an account?</p>
                <Link to={"/register"}>
                  <button
                    className="hover:underline hover:text-blue-600"
                    type="button"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            </form>
            <div className="flex items-center justify-center">
              <button
                className="hover:underline hover:text-black text-blue-600"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                Forgot password
              </button>
            </div>
          </div>
          <div className="sm:block hidden w-1/2 p-4">
            <img
              className="rounded-xl shadow-2xl"
              src={img}
            />
          </div>
        </div>
        <ForgotPasswordModal
          onOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </>
  );
}

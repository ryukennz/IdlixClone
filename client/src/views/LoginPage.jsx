import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
export default function LoginPage() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white flex md:flex-row max-w-4xl rounded-2xl">
          <div className="sm:w-1/2 py-24 px-14">
            <h2 className="p-4 text-black font-bold font-[] text-4xl">
              Sign in
            </h2>
            <form className="flex flex-col gap-6">
              <input
                name="username"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="text"
                placeholder="Username"
              />
              <input
                name="password"
                className="w-full p-4 bg-slate-100 rounded-xl"
                type="password"
                placeholder="Password"
              />
              <button
                className="w-full p-4 bg-black rounded-xl text-white text-xl"
                type="submit"
              >
                Sign in
              </button>

              <div className="p-2 flex justify-between sm:">
                <p>Already have an account?</p>
                <Link to={"/register"}>
                  <button type="button">Sign up</button>
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  className="hover:underline hover:text-blue-600"
                  type="button"
                  onClick={() => setOpenModal(true)}
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </div>
          <div className="sm:block hidden w-1/2 p-4">
            <img
              className="rounded-xl shadow-2xl"
              src="https://images.unsplash.com/photo-1714646542331-278803db302f?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
        <Modal onOpen={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </>
  );
}

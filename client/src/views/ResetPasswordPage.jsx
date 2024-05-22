import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useState } from "react";
import { toast } from "react-toastify";
export default function ResetPasswordPage() {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [updatePassword, setUpdatePassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUpdatePassword({
      ...updatePassword,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatePassword.newPassword !== updatePassword.confirmPassword) {
      toast.error("Password doesn't match");
    }
    try {
      const response = await axios({
        method: "POST",
        url: `/api/reset-password/${id}/${token}`,
        data: { password: updatePassword.newPassword },
      });
      setUpdatePassword({ newPassword: "", confirmPassword: "" });
      response.status === 200
        ? toast.success(response.data.message) && navigate("/login")
        : null;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-white p-8 rounded-2xl">
          <h1 className="text-2xl font-bold font-[open-sans] text-black mb-6">
            Reset your password here
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input
                value={updatePassword.newPassword}
                onChange={handleChange}
                name="newPassword"
                className="rounded-2xl bg-slate-100 p-4 text-black"
                type="password"
                placeholder="New password"
              />
              <input
                value={updatePassword.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                className="rounded-2xl bg-slate-100 p-4 text-black"
                type="password"
                placeholder="Re-enter new password"
              />
            </div>
            <button
              type="submit"
              className="w-full p-4 bg-black rounded-2xl text-2xl font-bold font-[open-sans] text-white mt-6"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import axios from '../utils/axios'
import { useState } from 'react';

export default function Modal({ onOpen, onClose }) {

  const [email, setEmail] = useState({
    email: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setEmail({
      ...email,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/forgot-password',
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex items-center justify-center transition-colors
        ${onOpen ? "visible bg-white/40" : "invisible"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all
        ${onOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"} 
        `}
        >
          <form>
            <button
              onClick={onClose}
              type="button"
              className="p-2 absolute top-2 right-2 text-black hover:text-gray-500"
            >
              X
            </button>
            <div className="flex flex-col">
              <h4 className="p-4 flex items-center justify-center text-2xl">
                Forgot Password
              </h4>
              <input
                value={email}
                onChange={handleChange}
                className="flex text-center w-full p-4 bg-slate-100 rounded-xl"
                type="email"
                placeholder="youremail@mail.com"
              />
              <button 
              type='submit'
              className="mt-4 p-4 bg-black rounded-xl font-bold text-white hover:text-gray-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // state for input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    console.log("Register Data:", { firstName, lastName, email, password });

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/register", // backend endpoint
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      toast.success("Registration successful! Please login.");

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[url('/login.jpg')] bg-center bg-cover">
      <div className="w-[50%] h-full "></div>

      <div className="w-[50%] h-full justify-center items-center flex">
        <div className="w-[500px] h-[650px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="First Name"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-[10px]"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last Name"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-[10px]"
          />

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-[10px]"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-[10px]"
          />

          <button
            onClick={handleRegister}
            className="w-[300px] h-[50px] border border-white bg-[#c3efe9] text-black rounded-[20px] my-[20px] cursor-pointer hover:bg-[#b2e6e0] transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

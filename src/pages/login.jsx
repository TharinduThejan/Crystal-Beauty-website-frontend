import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Login() {
  //e-mail and password are dynamically changing values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      toast.success("Login successful!");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="h-screen w-full flex  items-center justify-center bg-[url('/login.jpg')] bg-center bg-cover">
      <div className="w-[50%] h-full "></div>

      <div className="w-[50%] h-full  justify-center items-center flex">
        <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center ">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px] px-[10px]"
          />

          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px] px-[10px]"
          />

          <button
            onClick={handleLogin}
            className="w-[300px] h-[50px] border bg-[#c3efe9] text-white rounded-[20px] my-[20px]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

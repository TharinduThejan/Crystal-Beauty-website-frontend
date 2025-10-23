import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (Response) => {
      const accessToken = Response.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
          accessToken,
        })
        .then((response) => {
          toast.success("Login Successful");
          localStorage.setItem("token", response.data.token);
          if (response.data.role === "admin") navigate("/admin");
          else navigate("/");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Login Failed");
        });
    },
  });

  async function handleLogin() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password }
      );
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      if (response.data.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[url('/login.jpg')] bg-center bg-cover">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center px-6">
          <h1 className="text-3xl font-semibold mb-8 text-black">Login</h1>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-[10px] outline-none bg-transparent text-gray-800 placeholder-gray-800"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[10px] px-[10px] outline-none bg-transparent text-gray-800 placeholder-gray-800"
          />

          {/* Forgot Password Link */}
          <div className="w-[300px] flex justify-end text-sm text-gray-500 mb-2">
            <Link
              to="/forget"
              className="hover:text-[#c3efe9] transition duration-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-[300px] h-[50px] bg-[#ea7d7d] text-black rounded-[20px] my-[10px] hover:bg-[#b2e6e0] transition duration-300"
          >
            Login
          </button>

          <button
            onClick={googleLogin}
            className="w-[300px] h-[50px] bg-[#ea7d7d] text-black rounded-[20px] my-[10px] flex justify-center items-center gap-2 hover:bg-[#b2e6e0] transition duration-300"
          >
            <GrGoogle /> Sign in with Google
          </button>

          {/* Register Link */}
          <p className="text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#6d8380] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function sendotp() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        setOtpSent(true);
        toast.success("OTP sent to your email. Check your inbox!");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function verifyOtp() {
    if (newPassword === confirmPassword) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
          email: email,
          otp: otp,
          newPassword: newPassword,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Password reset successfully!");
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("There was an error!", error);
          toast.error(
            "Failed to reset password. Please check the OTP and try again."
          );
        });
    } else {
      toast.error("New Password and Confirm Password do not match.");
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/login.jpg')] bg-center bg-cover">
      {otpSent ? (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={() => verifyOtp()}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Verify OTP
          </button>
          <button
            onClick={() => setOtpSent(false)}
            className="mt-2 w-full bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Resend OTP
          </button>
        </div>
      ) : (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={() => sendotp()}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
}

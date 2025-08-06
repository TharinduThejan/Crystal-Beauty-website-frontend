import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  return (
    <div className="bg-lime-500">
      <h1 className="text-[30px]">Crystal Beauty Clear</h1>
      {/* <a href="/">Home</a>
      <a href="/login">Login</a> */}
      {/* //link tag is very smooth.no page reload */}
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

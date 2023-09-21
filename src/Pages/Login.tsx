import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import logo from "/logo.png";
import fireBase from "../FirebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const auth = getAuth(fireBase);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        localStorage.setItem("user", user.uid);

        setTimeout(() => {
          localStorage.removeItem("user");
        }, 600000);

        console.log(user);

        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT,
        });

        navigate("/home");
      })
      .catch(() => {
        toast.error("Invalid Login Credentials", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    setError(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="">
      <div>
        <img src={logo} alt="" className="w-[200px] mx-auto" />
      </div>
      <div className="flex flex-col border-2 border-gray-300 rounded-lg items-center p-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="bg-gray-300 px-7 py-1 rounded-md text-black">Login</h2>
        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-3 px-2 py-2 w-[300px] outline-none border-2 border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-3 px-2 py-2 w-[300px] outline-none border-2 border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="my-3 px-2 py-1 w-[100px] outline-none border-2 border-gray-300 rounded-md text-black hover:bg-gray-300"
            // onSubmit={handleLogin}
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

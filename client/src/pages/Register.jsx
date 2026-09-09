import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import api from "../api/axios.js";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  
  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  const token = Cookies.get("token");
  if (token) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await api.post("/api/auth/register", formData);
      const { data } = result;
      Cookies.set("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      setErr(error.response.data.message);
    }
  };

  return (
    <div className="text-xl pt-30 font-comic font-semibold flex flex-col items-center ">
      <h1 className=" text-2xl">Create Account</h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-2 ">
        <label htmlFor="idemail"> Email</label>
        <input
          onChange={handleForm}
          type="email"
          name="email"
          id="idemail"
          className="border rounded block w-sm px-1 outline-none"
        />
        <label htmlFor="idpassword"> Password</label>
        <input
          onChange={handleForm}
          type="password"
          name="password"
          id="idpassword"
          className="border rounded block w-sm px-1 outline-none"
        />
        <p className="text-red-500 text-center">{err}</p>
        <button
          className="block mx-auto p-1 mt-5 border min-w-20 rounded"
          type="submit"
        >
          Create Account
        </button>
      </form>
      <section className="flex space-x-2 mt-2">
        <p>Already Created? </p>
        <Link to="/login" className="underline decoration-dashed">
          Login
        </Link>
      </section>
    </div>
  );
};

export default Register;

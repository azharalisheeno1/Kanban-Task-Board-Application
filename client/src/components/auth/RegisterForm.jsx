import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth/useAuth';

const RegisterForm = () => {
    const { authForm, handleFormChange, register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register();
    if (success) navigate("/login");
  };
  return (
    <>
       <form onSubmit={handleSubmit} className="bg-indigo-500 p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-5 ">
        <h2 className="text-3xl text-white font-bold text-center">Create Account</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {["fname", "lname",  "email", "password"].map((field, index) => (
          <div key={index} className="space-y-1">
            <label htmlFor={field} className="block text-sm font-medium text-white">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={authForm[field]}
              onChange={handleFormChange}
              placeholder={`Enter your ${field}`}
              required
              className="w-full bg-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white "
            />
          </div>
        ))}

        <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-500 text-white py-2 rounded-lg font-semibold transition duration-200">
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="flex items-center gap-3 text-white">
          <h1>Already registered?</h1>
          <Link to="/login" className="font-semibold underline">
            Login
          </Link>
          
        </div>
      </form> 
    </>
  )
}

export default RegisterForm

import { useAuth } from '@/store/auth/useAuth';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = () => {
      const { authForm, handleFormChange, login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-indigo-500 p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-5 ">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Login</h2>

        <input
          name="email"
          type="email"
          value={authForm.email}
          onChange={handleFormChange}
          placeholder="Email"
          required
          className="w-full mb-3 p-2 border bg-white rounded"
        />
        <input
          name="password"
          type="password"
          value={authForm.password}
          onChange={handleFormChange}
          placeholder="Password"
          required
          className="w-full mb-3 p-2 border bg-white rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button disabled={loading} className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-white hover:text-indigo-700">
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex gap-3 text-white">
          <h1>Not registered?</h1>
          <Link to="/register" className="font-semibold underline">
            Register
          </Link>
          
        </div>
      </form> 
    </>
  )
}

export default LoginForm

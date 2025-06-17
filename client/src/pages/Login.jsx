import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Kanban Board Application</h1>
        <p className="mt-2 text-gray-600">
          Organize your projects efficiently with boards, lists, and cards. Please log in to continue.
        </p>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Create Your Account</h1>
        <p className="mt-2 text-gray-600">
          Join the Kanban Board Application to manage your tasks efficiently with boards, lists, and cards.
        </p>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;

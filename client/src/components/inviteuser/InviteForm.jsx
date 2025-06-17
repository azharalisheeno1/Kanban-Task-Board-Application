import { useAuth } from "@/store/auth/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const InviteForm = ({ boardId }) => {
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/boards/${boardId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
    
      if (!res.ok) throw toast.error(data.message || "Invite failed");

      toast.success("User invited successfully ✅");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
   <form onSubmit={handleInvite} className="  mx-auto">
  <div className="flex  gap-2">
    <input
      type="email"
      placeholder="Invite user by email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="bg-indigo-500 hover:bg-indigo-700 text-white px-4   rounded font-medium transition duration-200"
    >
      Send Invite
    </button>
  </div>
  {message && (
    <p className="text-sm text-gray-700 mt-2">{message}</p>
  )}
</form>

  );
};

export default InviteForm;

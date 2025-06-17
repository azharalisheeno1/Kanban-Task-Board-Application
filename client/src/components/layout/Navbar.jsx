import { useState } from "react";

import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { MdViewKanban } from "react-icons/md";
import { useAuth } from "@/store/auth/useAuth";
export function Navbar() {
  const { user, logout, token } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white  shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-2  text-indigo-600">
            <MdViewKanban size={25} /> Kanban Board
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            {token && user ? (
              <>
                <span className="text-gray-700 truncate max-w-[120px]">
                  Welcome, {user.fname}
                </span>
                <button
                  onClick={logout}
                  className="bg-indigo-600 hover:bg-indigo-600 text-white px-3 py-1 rounded transition"
                >
                  Logout
                </button>
              
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-2 py-1 rounded "
                >
                  Register
                </Link>
                <Link to="/login" className="bg-indigo-600 text-white px-2 py-1 rounded ">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          {token && user ? (
            <>
              <p className="text-gray-700 py-2">Welcome, {user.fname}</p>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded mt-1"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block bg-indigo-600 text-white px-2 py-1 rounded "
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-indigo-600 text-white px-2 py-1 rounded "
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

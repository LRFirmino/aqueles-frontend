import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) return null; // evita flicker

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-8 py-4 rounded-xl">
      <span className="text-xl font-semibold text-gray-800">
        🌈 Aqueles, né?
      </span>

      <div className="flex items-center gap-6">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
          </>
        ) : (
          /*<>
          
           <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>

            <Link to="/account" className="hover:text-blue-600">
              Conta
            </Link>
          */
         <>
            <button
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}


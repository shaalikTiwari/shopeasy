import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          ShopEasy 🛍️
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium">
            Products
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="text-gray-600 hover:text-orange-500 font-medium">
                My Orders
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-orange-500 font-medium">
                Cart 🛒
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="text-gray-600 hover:text-orange-500 font-medium">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Hi, {user.name.split(" ")[0]}</span>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-gray-600 hover:text-orange-500 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
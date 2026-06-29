import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const HomePage = () => (
  <div className="max-w-6xl mx-auto px-4 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ShopEasy 🛍️</h1>
    <p className="text-gray-500">Products coming in Phase 4!</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
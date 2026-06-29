import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🛒</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add some products to get started</p>
      <Link to="/" className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition">
        Browse Products
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
              <p className="text-orange-500 font-bold mt-1">₹{item.price.toLocaleString("en-IN")}</p>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition text-sm"
              >
                −
              </button>
              <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition text-sm"
              >
                +
              </button>
            </div>

            <p className="font-bold text-gray-800 w-24 text-right text-sm">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-400 hover:text-red-600 transition text-lg ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{cartTotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-xl font-bold text-orange-500">₹{cartTotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex flex-col gap-3 mt-6">
        <button
            onClick={() => user ? navigate("/checkout") : navigate("/login")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition text-base"
        >
            {user ? "Proceed to Checkout →" : "Login to Checkout"}
        </button>
        <button
            onClick={clearCart}
            className="w-full border border-gray-200 text-gray-400 py-2 rounded-xl font-medium hover:bg-gray-50 transition text-sm"
        >
            Clear Cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
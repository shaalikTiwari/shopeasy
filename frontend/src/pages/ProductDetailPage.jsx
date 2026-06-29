import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-96 bg-gray-200 rounded-2xl mb-6" />
    </div>
  );

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="text-orange-500 hover:underline text-sm mb-6 flex items-center gap-1">
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden md:flex">
        <div className="md:w-1/2 h-72 md:h-auto bg-gray-100 flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">🛍️</span>
          )}
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.name}</h1>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{product.description}</p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-gray-800">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </div>

            <p className={`text-sm mt-2 ${product.stock === 0 ? "text-red-500" : "text-green-600"}`}>
              {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
            </p>
          </div>

          {product.stock > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={() => { addToCart(product, quantity); navigate("/cart"); }}
                className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 rounded-xl transition"
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group">
      <Link to={`/products/${product._id}`}>
        <div className="h-52 bg-gray-100 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <Link to={`/products/${product._id}`}>
          <h3 className="text-gray-800 font-semibold mt-1 hover:text-orange-500 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-800">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-red-500 mt-2">Only {product.stock} left!</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
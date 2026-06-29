import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axios";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-6">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      {order && (
        <div className="bg-white rounded-2xl shadow-sm p-6 text-left mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium text-gray-800 text-xs">{order._id}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Payment</span>
            <span className="text-green-600 font-medium capitalize">{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Status</span>
            <span className="font-medium capitalize">{order.orderStatus}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-orange-500">₹{order.totalAmount?.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          to="/orders"
          className="flex-1 border border-orange-500 text-orange-500 py-2.5 rounded-xl font-medium hover:bg-orange-50 transition text-sm"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "iPhone 15",
      price: 1299,
      quantity: 1,
      image: "https://example.com/iphone.jpg",
    },
    {
      id: 2,
      name: "MacBook Pro",
      price: 2500,
      quantity: 1,
      image: "https://example.com/macbook.jpg",
    },
  ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <ShoppingCart className="text-blue-600" /> Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty.{" "}
          <Link to="/products" className="text-blue-600 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Qty: {item.quantity}</span>
                <span className="font-semibold text-gray-800">
                  ${item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">Total: ${total}</h3>
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

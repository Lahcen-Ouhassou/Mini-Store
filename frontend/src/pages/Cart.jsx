import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      price: 59.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1580894742925-9a27e3b71c12?w=500",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 99.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1603791452906-bb9e9a8f9b1b?w=500",
    },
  ]);

  const updateQuantity = (id, action) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-16 bg-white shadow rounded-xl">
          <p>Your cart is empty 😢</p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-5 gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-1/2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="bg-gray-200 px-3 py-1 rounded-lg text-lg"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-gray-800 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ${total}
            </h3>
            <Link
              to="/checkout"
              className="inline-block bg-green-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

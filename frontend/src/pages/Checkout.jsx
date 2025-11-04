import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  // مثال مؤقت للمنتجات فالكارت (لاحقاً غادي تجي من backend)
  const cartItems = [
    { id: 1, name: "Smartphone X", price: 499.99, quantity: 1 },
    { id: 2, name: "Wireless Headphones", price: 99.99, quantity: 2 },
  ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ✅ اليسار: form ديال المعلومات */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Checkout
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                placeholder="123 Main Street"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">City</label>
                <input
                  type="text"
                  placeholder="Agadir"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="80000"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+212 600 000 000"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
            </div>

            {/* زر التأكيد */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Confirm Order
            </button>
          </form>
        </div>

        {/* ✅ اليمين: ملخص الطلب */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between text-gray-700"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-3">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* رجوع للكارت */}
          <Link
            to="/cart"
            className="block mt-4 text-center text-blue-600 hover:underline"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

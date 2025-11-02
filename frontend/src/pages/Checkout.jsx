import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cod", // Cash on Delivery by default
  });

  const cartItems = [
    { id: 1, title: "Wireless Headphones", price: 59.99, quantity: 2 },
    { id: 2, title: "Smart Watch", price: 99.99, quantity: 1 },
  ];

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!order.name || !order.address || !order.phone) {
      alert("Please fill all required fields 📝");
      return;
    }

    alert("✅ Order confirmed successfully!");
    navigate("/orders"); // redirect to Orders page after confirmation
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">🧾 Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Side: Form */}
        <form
          onSubmit={handleConfirm}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Shipping Information
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={order.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={order.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={order.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={order.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            rows="3"
            required
          ></textarea>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
            Payment Method
          </h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={order.payment === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={order.payment === "card"}
                onChange={handleChange}
              />
              Credit / Debit Card
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition"
          >
            Confirm Order
          </button>
        </form>

        {/* Right Side: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between py-3 text-gray-700"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="text-right mt-4">
            <h3 className="text-xl font-bold text-gray-800">Total: ${total}</h3>
          </div>

          <Link
            to="/cart"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

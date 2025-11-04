import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ali", text: "Great products and fast delivery!" },
    { id: 2, name: "Sara", text: "I love the quality, will buy again!" },
  ]);
  const [newReview, setNewReview] = useState({ name: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const newEntry = {
      id: reviews.length + 1,
      name: newReview.name,
      text: newReview.text,
    };
    setReviews([...reviews, newEntry]);
    setNewReview({ name: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-gray-60 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Customer Reviews
        </h2>

        {/* ✅ Form ديال الإضافة */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />
          <textarea
            placeholder="Write your review..."
            value={newReview.text}
            onChange={(e) =>
              setNewReview({ ...newReview, text: e.target.value })
            }
            className="w-full p-3 border rounded-lg h-28 focus:ring focus:ring-blue-300 outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>

        {/* ✅ عرض كل الـ Reviews */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <p className="font-semibold text-gray-800">{rev.name}</p>
              <p className="text-gray-600 mt-1">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

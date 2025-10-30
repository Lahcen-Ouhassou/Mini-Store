import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Tailwind شغال مزيان!
      </h1>

      {/* اختيار الـ Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-500 text-white p-4 rounded text-center">1</div>
        <div className="bg-red-500 text-white p-4 rounded text-center">2</div>
        <div className="bg-green-500 text-white p-4 rounded text-center">3</div>
      </div>

      {/* اختيار الـ Hover */}
      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
        Hover
      </button>

      {/* اختيار الـ Responsive */}
      <div className="mt-4 text-sm md:text-lg lg:text-xl bg-yellow-100 p-3">
        هذا النص يتغير حسب حجم الشاشة
      </div>
    </div>
  );
}

export default App;

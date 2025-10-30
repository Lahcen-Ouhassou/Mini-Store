import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-500">
        ✅ إذا شفت هذا النص أخضر - Tailwind شغال!
      </h1>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        زر تجريبي
      </button>
    </div>
  );
}

export default App;

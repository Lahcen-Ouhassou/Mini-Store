import React from "react";

function About() {
  return (
    <section className="min-h-screen bg-gray-60 flex flex-col items-center justify-center px-6 py-16 text-gray-800">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          About Mini-Store
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to{" "}
          <span className="font-semibold text-indigo-600">Mini-Store</span> —
          your modern online shop built with the latest web technologies. Our
          goal is to provide a smooth, fast, and intuitive shopping experience
          where users can explore, select, and order products easily.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          This project is developed as part of a MERN stack learning journey.
          The focus is on clean code, modern UI design, and real-world
          functionality. Step by step, we’re building both the frontend and
          backend to simulate a complete e-commerce experience.
        </p>

        <p className="text-md text-gray-600 italic">
          — Designed & Developed by{" "}
          <span className="font-medium text-gray-800">Lahcen Ouhassou — </span>
        </p>
      </div>
    </section>
  );
}

export default About;

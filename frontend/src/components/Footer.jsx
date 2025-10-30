import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} MiniStore. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

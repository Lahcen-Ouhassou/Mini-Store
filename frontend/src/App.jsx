import { Routes, Route } from "react-router-dom";

// 🧩 Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Footer from "./components/Footer";

// 📄 Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Overview from "./pages/admin/Overview";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Routes>
        {/* 🌍 User Layout */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* 🏠 Home Page */}
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <ProductsSection />
                      </>
                    }
                  />

                  {/* ⭐ Reviews */}
                  <Route path="/reviews" element={<Reviews />} />

                  {/* 👤 Auth */}
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />

                  {/* 🛒 Products */}
                  <Route path="/products" element={<Products />} />
                  <Route
                    path="/products-details/:id"
                    element={<ProductDetails />}
                  />

                  {/* 🧾 Cart & Checkout */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* ℹ️ About & Contact */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
        {/* ⚙️ Admin Auth (before admin dashboard) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* ⚙️ Admin Layout */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/Overview" element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App;

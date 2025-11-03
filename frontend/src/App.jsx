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

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <main className="flex-grow">
        <Routes>
          {/* Home Page*/}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductsSection />
              </>
            }
          />

          {/* Login/Signup*/}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Products */}
          <Route path="/products" element={<Products />} />
          <Route path="/products-details/:id" element={<ProductDetails />} />

          {/* Cart/Checkout*/}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* About/Contact*/}
          <Route
            path="/about"
            element={
              <div className="py-16 text-center text-lg font-semibold">
                About Page
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="py-16 text-center text-lg font-semibold">
                Contact Page
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

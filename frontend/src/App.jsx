import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <main className="flex-grow">
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/products-details/:id" element={<ProductDetails />} />
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductsSection />
              </>
            }
          />

          {/* صفحة المنتجات */}
          <Route path="/products" element={<Products />} />

          <Route
            path="/about"
            element={
              <div className="text-center text-gray-900 py-16">About Page</div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="text-center text-gray-900 py-16">
                Contact Page
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

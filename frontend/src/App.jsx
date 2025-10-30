import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Footer from "./components/Footer";
import Products from "./pages/Products";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* الصفحة الرئيسية */}
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

          {/* صفحات أخرى (فارغة الآن، نزيدهم من بعد) */}
          <Route
            path="/about"
            element={<div className="text-center py-16">About Page</div>}
          />
          <Route
            path="/contact"
            element={<div className="text-center py-16">Contact Page</div>}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

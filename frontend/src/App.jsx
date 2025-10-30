import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <ProductsSection />
    </div>
  );
}

export default App;

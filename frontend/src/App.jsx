import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Hero />
      <ProductsSection />
      <main className="flex-grow">
        {/* هنا غادي نزيدو المحتوى ديال الصفحة */}
      </main>
      <Footer />
    </div>
  );
}

export default App;

import ProductCard from "./ProductCard";
import headphones from "../assets/headphones.jpg";
import watch from "../assets/watch.jpg";
import speaker from "../assets/speaker.jpg";

function ProductsSection() {
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 49.99,
      image: headphones,
      description:
        "description description description description description description description description description description description description description description description ",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 79.99,
      image: watch,
      description:
        "description description description description description description description description description description description description description description description ",
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 39.99,
      image: speaker,
      description:
        "description description description description description description description description description description description description description description description ",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">  {/* grid-cols-1 sm:grid-cols-2 : hada f screen sghira kyban wahd product f screen mtwsta kybano 2 hada responsive */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;

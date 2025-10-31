import { useParams } from "react-router-dom";

function ProductDetails() {
  // useParams كتجيب id من URL
  const { id } = useParams();

  // مؤقتاً، نعرض غير id باش نتأكدو أنها خدامة
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Product Details Page
      </h1>
      <p className="text-lg text-gray-700">Product ID: {id}</p>
    </div>
  );
}

export default ProductDetails;

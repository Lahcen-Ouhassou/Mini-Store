export function Button({ children, variant = "primary", ...props }) {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      lahOu Dev Aus Marokko
    </button>
  );
}

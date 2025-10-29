export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-400">
            MiniStore
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Products</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Login Button */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

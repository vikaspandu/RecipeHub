// src/components/Header.jsx
import { Link } from "react-router";
import { Heart, Search } from "lucide-react"; // ✅ Icons from lucide-react

function Header({ favoritesCount }) {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-green-500 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide flex items-center gap-2"
        >
          🍲 RecipeHub
        </Link>

        {/* Right - Nav Items */}
        <div className="flex items-center gap-6">
          {/* Home */}
          <Link
            to="/"
            className="text-white hover:text-gray-100 transition font-medium"
          >
            Home
          </Link>

          {/* Search Icon
          <button className="text-white hover:text-gray-100 transition">
            <Search size={22} />
          </button> */}

          {/* Favorites */}
          <Link to="/favorites" className="relative">
            <Heart size={24} className="text-white hover:text-gray-100" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

import { useState, useEffect } from "react";
import ShimmerCard from "../components/ShimmerCard"; // import shimmer

function Home({ onAddFavorite, favorites, onRemoveFavorite }) {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Random Recipes
  useEffect(() => {
    const fetchRandomRecipes = async () => {
      setLoading(true);
      try {
        const randomPromises = Array.from({ length: 8 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(randomPromises);
        const meals = results.map((r) => r.meals[0]);
        setRecipes(meals);
      } catch (err) {
        setError("Failed to load random recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipes();
  }, []);

  // Search Handler
  const handleSearch = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found with that ingredient.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 my-10">
      {/* Search Bar */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Search recipes by ingredient..."
          className="w-full sm:w-1/2 p-2 border border-gray-400 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Shimmer while loading */}
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ShimmerCard key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => {
            const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

            return (
              <div
                key={recipe.idMeal}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {recipe.strMeal}
                  </h3>

                  <div className="mt-auto">
                    {isFavorite ? (
                      <button
                        onClick={() => onRemoveFavorite(recipe.idMeal)}
                        className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                      >
                        Remove from Favorites ❌
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddFavorite(recipe)}
                        className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition"
                      >
                        Add to Favorites ❤️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;

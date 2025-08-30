// src/components/Favorites.jsx
function Favorites({ favorites, onRemoveFavorite }) {
  return (
    <div className="container my-10">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        ❤️ My Favorite Recipes
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Add some recipes!</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {recipe.strMeal}
                </h3>
                <button
                  onClick={() => onRemoveFavorite(recipe.idMeal)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./components/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (recipe) => {
    if (!favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const handleRemoveFavorite = (idMeal) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== idMeal));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header favoritesCount={favorites.length} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

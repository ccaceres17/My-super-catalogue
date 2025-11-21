import { createContext, useContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    if (!favorites.find(p => p.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(p => p.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 👇 Hook personalizado
export const useFavorites = () => useContext(FavoritesContext);

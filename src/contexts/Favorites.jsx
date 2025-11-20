import { useContext } from 'react'
import { Favorites } from '../context/Favorites'

const Favorites = () => {
  const { favorites } = useContext(Favorites)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes productos en favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3>{product.title}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites

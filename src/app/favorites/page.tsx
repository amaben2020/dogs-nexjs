'use client';

import DogCard from '@/components/elements/DogCard/DogCard';
import { useFavoritesStore } from '@/store/favorites';

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
}

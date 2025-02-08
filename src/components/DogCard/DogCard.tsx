import { useFavoritesStore } from '@/store/favorites';
import Image from 'next/image';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
  img: string;
}

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const isFavorite = favorites.some((fav) => fav.id === dog.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }
  };

  console.log(favorites);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <Image
        className="w-full h-48 object-cover"
        src={dog.img}
        alt={dog.name}
        width={200}
        height={48}
        priority
        quality={100}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{dog.name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Breed:</span> {dog.breed}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Age:</span> {dog.age} years
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Zip Code:</span> {dog.zip_code}
        </p>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded-full text-white ${
            isFavorite ? 'bg-red-500' : 'bg-blue-500'
          } hover:bg-opacity-80 transition-colors duration-200`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default DogCard;

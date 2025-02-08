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

  const { zip_code, age, breed, img, id, name } = dog;

  const isFavorite = favorites.some((fav) => fav.id === dog.id);

  const toggleFavorite = () => {
    const clickSound = new Audio('/click.wav');
    clickSound.play();

    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }
  };

  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-200 hover:shadow-xl transition-shadow duration-300 relative"
      key={id}
    >
      <Image
        className="w-full h-48 object-cover"
        src={img}
        alt={`Image-for-${name}`}
        width={200}
        height={48}
        priority
        quality={100}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-950">{name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Breed:</span> {breed}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Age:</span> {age} years
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Zip Code:</span> {zip_code}
        </p>
      </div>
      <div className="px-6 py-4 absolute -right-4 -top-2">
        <button
          onClick={toggleFavorite}
          className={`px-3 py-1 rounded-full text-black shadow-sm ${
            isFavorite ? 'bg-green-500' : 'bg-green-400'
          } hover:bg-opacity-80 transition-colors duration-200`}
        >
          {isFavorite ? '-' : '+'}
        </button>
      </div>
    </div>
  );
};

export default DogCard;

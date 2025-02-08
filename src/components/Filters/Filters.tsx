// import React from 'react';

// interface FiltersProps {
//   breeds: string[];
//   setFilters: (filters: any) => void;
// }

// const Filters: React.FC<FiltersProps> = ({ breeds, setFilters }) => {
//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilters({ breed: e.target.value });
//   };

//   return (
//     <div className="mb-6">
//       <select
//         onChange={handleFilterChange}
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">All Breeds</option>
//         {breeds?.map((breed) => (
//           <option key={breed} value={breed}>
//             {breed}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Filters;

const Filters = ({ breeds, selectedBreeds, setFilters }) => {
  const handleBreedChange = (breed) => {
    setFilters((prev) => ({
      ...prev,
      breeds: prev.breeds.includes(breed)
        ? prev.breeds.filter((b) => b !== breed) // Remove breed if already selected
        : [...prev.breeds, breed], // Add breed if not selected
    }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Filter by Breed</h2>
      <div className="flex flex-wrap gap-2">
        {breeds?.map((breed) => (
          <button
            key={breed}
            onClick={() => handleBreedChange(breed)}
            className={`px-4 py-2 rounded-lg ${
              selectedBreeds.includes(breed)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {breed}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;

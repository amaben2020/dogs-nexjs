const Filters = ({
  breeds,
  selectedBreeds,
  setFilters,
}: {
  breeds: Array<string[]>;
}) => {
  console.log(breeds);
  console.log(selectedBreeds);
  console.log(setFilters);

  const handleBreedChange = (breed) => {
    setFilters((prev) => ({
      ...prev,
      breeds: prev.breeds.includes(breed)
        ? prev.breeds.filter((b) => b !== breed)
        : [...prev.breeds, breed],
    }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Filter by Breed </h2>
      <div className="flex flex-wrap gap-2">
        {breeds?.map((breed) => (
          <button
            key={breed}
            onClick={() => handleBreedChange(breed)}
            className={`px-1.5 italic py-1 rounded-lg ${
              selectedBreeds.includes(breed)
                ? 'bg-green-500 text-gray-700 font-semibold not-italic'
                : 'bg-gray-200 text-gray-500'
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

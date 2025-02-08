'use client';
import { useEffect, useState } from 'react';
import {
  useBreeds,
  useSearchDogs,
  useFetchDogsByIds,
} from '../../hooks/useDogs';
import DogCard from '../../components/DogCard/DogCard';

import Filters from '@/components/Filters/Filters';
import Pagination from '@/components/Pagination/Pagination';

export default function Search() {
  const [filters, setFilters] = useState({
    breeds: [], // ✅ Array of selected breeds
    sort: 'breed:asc', // ✅ Default sorting
  });

  const [page, setPage] = useState(1);

  const { data: breeds } = useBreeds();
  const { data: searchResults } = useSearchDogs({
    breeds: filters.breeds.length > 0 ? filters.breeds : undefined, // ✅ Only send breeds if selected
    sort: filters.sort,
    size: 25,
    from: (page - 1) * 25,
  });

  const { data: dogs } = useFetchDogsByIds(searchResults?.resultIds || []);

  const handleSortChange = () => {
    setFilters((prev) => ({
      ...prev,
      sort: prev.sort === 'breed:asc' ? 'breed:desc' : 'breed:asc',
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Dogs</h1>

      {/* ✅ Pass breeds to the Filters component */}
      <Filters
        breeds={breeds}
        selectedBreeds={filters.breeds}
        setFilters={setFilters}
      />

      <button
        onClick={handleSortChange}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Sort: {filters.sort === 'breed:asc' ? 'Ascending' : 'Descending'}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dogs?.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} total={searchResults?.total} />

      {/* <button
        onClick={handleGenerateMatch}
        className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        Generate Match
      </button> */}
    </div>
  );
}

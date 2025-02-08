'use client';
import { useState } from 'react';

import Filters from '@/components/elements/Filters/Filters';
import Pagination from '@/components/elements/Pagination/Pagination';
import { useBreeds, useFetchDogsByIds, useSearchDogs } from '@/hooks/useDogs';
import {
  BreedsFilterSkeleton,
  DogCardSkeleton,
} from '@/components/elements/Skeleton';
import DogCard from '@/components/elements/DogCard/DogCard';

export interface IFilters {
  breeds: string[];
  sort: string;
}

export default function SearchComponent() {
  const [filters, setFilters] = useState<IFilters>({
    breeds: [], // ✅ Array of selected breeds
    sort: 'breed:asc', // ✅ Default sorting as per project requirement
  });

  const [page, setPage] = useState<number>(1);

  const {
    data: breeds,
    isLoading: isBreedsLoading,
    isError: isBreedError,
  } = useBreeds();
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError,
  } = useSearchDogs({
    breeds: filters.breeds.length > 0 ? filters.breeds : undefined,
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

  if (isBreedError || isError) {
    return <p>Something went terribly wrong</p>;
  }

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Search Dogs</h1>
      {isBreedsLoading ? (
        <BreedsFilterSkeleton />
      ) : (
        <Filters
          breeds={breeds}
          selectedBreeds={filters.breeds}
          setFilters={setFilters}
        />
      )}
      <div className="flex gap-6 items-center my-4">
        <p>Sort by breed {filters.sort.includes('asc') ? '⬆️ ' : '⬇️'}</p>{' '}
        <select
          name="sort"
          onChange={handleSortChange}
          className="  text-gray-700 px-4 py-2 rounded-lg   transition"
        >
          <option value="breed:asc">Asc </option>
          <option value="breed:desc">Desc </option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-screen">
        {!isSearchLoading &&
          dogs?.map((dog) => <DogCard key={dog.id} dog={dog} />)}
        {isSearchLoading && (
          <>
            <DogCardSkeleton />
            <DogCardSkeleton />
            <DogCardSkeleton />
            <DogCardSkeleton />
          </>
        )}
      </div>

      <Pagination page={page} setPage={setPage} total={searchResults?.total} />
    </div>
  );
}

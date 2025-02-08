export const BreedsFilterSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-3 mt-10">
      {Array.from({ length: 70 }).map((_, index) => (
        <div
          key={index}
          className="h-10 w-28 bg-gray-200 animate-pulse rounded"
        />
      ))}
    </div>
  );
};

export const DogCardSkeleton = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      <div className="px-6 py-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
        <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
        <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
        <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
      </div>
      <div className="px-6 py-4">
        <div className="h-10 bg-gray-200 animate-pulse rounded-lg" />
      </div>
    </div>
  );
};

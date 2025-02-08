interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  total?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  total = 10000,
}) => {
  const pageSize = 25;
  const totalPages = Math.ceil(total / pageSize);

  const getPageRanges = () => {
    const ranges = [];
    for (let i = 0; i < totalPages; i += 40) {
      ranges.push({
        label: `${i * pageSize} - ${(i + 40) * pageSize - 1}`,
        value: i + 1,
      });
    }
    return ranges;
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:bg-gray-300"
      >
        Previous
      </button>

      <select
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        className="px-4 py-2 border rounded-lg"
      >
        {getPageRanges().map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

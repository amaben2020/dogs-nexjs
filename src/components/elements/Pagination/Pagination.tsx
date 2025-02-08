import Button from '../Button';

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

  const handleNext = () => setPage(page + 1);
  const handlePrev = () => setPage(page - 1);

  return (
    <div className="flex justify-center gap-3 items-center my-12">
      <Button
        onClick={handlePrev}
        text="Previous"
        isDisabled={page >= totalPages}
        variant="primary"
      />

      <select
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        className="px-4 py-2 border rounded-lg text-gray-700"
      >
        {getPageRanges().map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>

      <Button
        onClick={handleNext}
        text="Next"
        isDisabled={page >= totalPages}
        variant="primary"
      />
    </div>
  );
};

export default Pagination;

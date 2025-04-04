// Define the props expected by the Pagination component 
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
  }
  
  // Functional component for rendering pagination controls
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps) => {
    return (
      <div className="flex item-center justify-center mt-4">
        {/* Previous button disabled on first page */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {/* Page number buttons */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            disabled={currentPage === i + 1} // Disable button for current page
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
        <br />
        {/* Dropdown to select page size */}
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value)); // Update the page size
              onPageChange(1); // Reset to page 1 when page size changes
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>{' '}
      </div>
    );
  };
  
  export default Pagination;
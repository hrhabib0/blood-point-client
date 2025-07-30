import ReactPaginate from "react-paginate";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const FundingTable = ({ data, isLoading }) => {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => setPage(selected);

  if (isLoading) return <p>Loading fundings...</p>;

  return (
    <div className="overflow-x-auto border rounded-xl shadow">
      <table className="table w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>Donor Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((fund) => (
            <tr key={fund._id}>
              <td>{fund.donorName}</td>
              <td>৳ {fund.amount}</td>
              <td>{new Date(fund.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          activeClassName={"font-bold text-red-500"}
        />
      </div>
    </div>
  );
};

export default FundingTable;

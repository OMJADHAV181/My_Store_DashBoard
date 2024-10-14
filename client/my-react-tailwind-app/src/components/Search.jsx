import React, { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import Loader from './Loader';
import Card from './Card';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0); // State for storing total results
  const [page, setPage] = useState(1); // State for current page
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [selectedMonth, setSelectedMonth] = useState('March'); // State for selected month

  const pageSize = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/transactions?&search=${searchTerm}&page=${page}&limit=${pageSize}&month=${selectedMonth}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const myJson = await response.json();
        setTotalResults(myJson.totalRecords || 0);
        setData(myJson.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm, selectedMonth]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page when the search term changes
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setPage(1); // Reset to the first page when the month selection changes
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div className='p-2 flex flex-col items-center'>
      <div className='flex items-center w-full'>
        <input
          type="text"
          placeholder="Search Store"
          value={searchTerm}
          onChange={handleSearchChange}
          className='bg-yellow-400 p-2 rounded-lg text-black pr-10 w-1/4'
        />

        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className='bg-yellow-400 p-2 rounded-lg text-black ml-4'
        >
          <option value="" disabled>Select a month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="my-10">
        {isLoading ? (
          <Loader />
        ) : (
          <Card items={data} />
        )}
      </div>

      {/* Pagination Buttons */}
      <div className='flex mt-4 space-x-4'>
        <button 
          className='bg-gray-300 p-2 rounded-lg text-black' 
          onClick={handlePrevPage}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className='bg-black text-white rounded-md p-2'>Page {page} of {Math.ceil(totalResults / pageSize)}</span>
        <button 
          className='bg-gray-300 p-2 rounded-lg text-black' 
          onClick={handleNextPage}
          disabled={page >= Math.ceil(totalResults / pageSize)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Search;

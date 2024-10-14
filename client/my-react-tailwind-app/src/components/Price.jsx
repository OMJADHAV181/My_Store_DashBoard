import React, { useEffect, useState } from 'react';

const Price = () => {
  const [data, setData] = useState('');
  const [sale, setTotalSaleAmount] = useState(0);
  const [soldItem, setTotalSoldItem] = useState(0);
  const [notSoldItem, setNotSoldItem] = useState(0);
  const [month, setMonth] = useState('March');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/txn/statistics?month=${month}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.data);
        setTotalSoldItem(result.totalSoldItem);
        setNotSoldItem(result.totalNotSoldItems);
        setTotalSaleAmount(result.totalSaleAmount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [month]); // Fetch data when the month changes

  return (
    <div className="p-4 bg-yellow-300">
      <h2 className="text-4xl mb-4">Statistics for {month}</h2>
      <div className="mb-2">
        <strong className='text-lg'>Total Sold Items:</strong> {soldItem}
      </div>
      <div className="mb-2">
        <strong className='text-lg'>Total Not Sold Items:</strong> {notSoldItem}
      </div>
      <div className="mb-2">
        <strong className='text-lg'>Total Sale Amount:</strong> ${sale}
      </div>

      {/* Dropdown for selecting a month */}
      <div className="mt-4">
        <label htmlFor="month" className="mr-2 text-lg font-semibold">Select Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 rounded-lg border bg-yellow-300"
        >
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
    </div>
  );
};

export default Price;

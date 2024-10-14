import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [data, setData] = useState({ result: [] });
  const [month, setMonth] = useState('March');

  const data1 = {
    labels: data.result.map((elem) => elem.range),
    datasets: [
      {
        label: 'Item Count',
        data: data.result.map((elem) => elem.item_Count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(231, 233, 237, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `Monthly Sales Data - ${month}`,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/txn/range/statistics?month=${month}`
        );
        if (!response.ok) {
          throw new Error('Network Error');
        }
        const result = await response.json();
        setData(result); // Assuming result contains the "result" array from the API
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [month]);

  return (
    <div className='bg-gray-300 p-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold'>Bar Chart - {month}</h1>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className='bg-gray-500 border-[1px] rounded-lg p-2'
        >
          <option value='January'>January</option>
          <option value='February'>February</option>
          <option value='March'>March</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='July'>July</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='December'>December</option>
        </select>
      </div>
      <Bar data={data1} options={options} />
    </div>
  );
};

export default Statistics;

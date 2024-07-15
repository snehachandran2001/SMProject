import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const StockGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        data: [],
        fill: false,
        borderColor: '#007BFF',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/fetch-reliance-stock-data/');
        updateChartData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    const updateChartData = (data) => {
      const newChartData = {
        labels: [...chartData.labels, data.date],
        datasets: [{
          ...chartData.datasets[0],
          data: [...chartData.datasets[0].data, data.close],
        }],
      };
      setChartData(newChartData);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, [chartData]);

  return (
    <div className="stock-graph">
      <h2>Live Stock Price</h2>
      <Line data={chartData} options={{
        animation: {
          duration: 0 // Disable animations for better performance
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
              tooltipFormat: 'll HH:mm',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price (INR)'
            }
          }
        },
      }} />
    </div>
  );
};

export default StockGraph;\\nb 
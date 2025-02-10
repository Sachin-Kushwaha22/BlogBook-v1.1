import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register the chart components you want to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = () => {
  // Line Chart Data
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false, // No fill under the line
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Number of Products Sold',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['red', 'blue', 'yellow'],
        borderColor: ['white', 'white', 'white'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={lineData} options={{ responsive: true }} />

      <h2>Bar Chart</h2>
      <Bar data={barData} options={{ responsive: true }} />

      <h2>Pie Chart</h2>
      <Pie data={pieData} options={{ responsive: true }} />
    </div>
  );
};

export default Charts;

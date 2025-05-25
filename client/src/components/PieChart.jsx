import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const userId = user ? user._id : null;

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/phq9/result/${userId}`);
        const data = response.data.data;

        if (!Array.isArray(data) || data.length === 0) {
              setChartData(null);
              return;
        }
        // Group data by severity
        const severityCounts = data.reduce((acc, item) => {
          let severity = '';

          if (item.score >= 0 && item.score <= 4) {
            severity = 'Minimal depression';
          } else if (item.score >= 5 && item.score <= 9) {
            severity = 'Mild depression';
          } else if (item.score >= 10 && item.score <= 14) {
            severity = 'Moderate depression';
          } else if (item.score >= 15 && item.score <= 19) {
            severity = 'Moderately severe depression';
          } else if (item.score >= 20) {
            severity = 'Severe depression';
          }

          acc[severity] = (acc[severity] || 0) + 1;
          return acc;
        }, {});

        // Prepare chart data
        const labels = Object.keys(severityCounts);
        const values = Object.values(severityCounts);

        // Assign custom colors based on severity
        const backgroundColors = labels.map((severity) => {
          switch (severity) {
            case 'Minimal depression':
              return '#81C784';  // Light Green
            case 'Mild depression':
              return '#FFEB3B';  // Yellow
            case 'Moderate depression':
              return '#FF9800';  // Orange
            case 'Moderately severe depression':
              return '#F44336';  // Red
            case 'Severe depression':
              return '#D32F2F';  // Dark Red
            default:
              return '#B0BEC5';  // Default grey if severity not recognized
          }
        });

        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors, // Same colors for hover effect
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const currentDate = new Date().toLocaleDateString();


  return (
    <div className=' m-auto j'>
    
      {chartData ? (
        <div>

        <Pie data={chartData} />
        <h2 className='text-sky-400 mt-4 text-lg font-bold'>User Severity Pie Chart for {currentDate}</h2>
        </div>
      ) : (
        <p className='text-center text-gray-500'>No chart data available for this user.</p>
      )}
    </div>
  );
};

export default PieChart;

import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const SteppedLineChart = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: data,
        borderColor: "#6600CC",
        backgroundColor: "#6600CC",
        fill: true,
        stepped: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        position: "right", // Position Y-axis on the right side
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          stepSize: 5,
          maxTicksLimit: 8,
          lineHeight: 0.2,
        },
        beginAtZero: false,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SteppedLineChart;

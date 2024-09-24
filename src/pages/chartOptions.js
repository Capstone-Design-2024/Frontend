export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      position: "right",
      grid: {
        display: false,
      },
      beginAtZero: false,
      ticks: {
        padding: 10,
        stepSize: 5,
        maxTicksLimit: 8,
        lineHeight: 0.2,
      },
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

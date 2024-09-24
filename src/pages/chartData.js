import { intervals } from "./constants";

export function getChartData(selectedInterval) {
  return {
    labels: intervals[selectedInterval].map((_, index) => index + 1),
    datasets: [
      {
        label: "",
        data: intervals[selectedInterval],
        borderColor: "#6600CC",
        backgroundColor: "#6600CC",
        fill: true,
      },
    ],
  };
}

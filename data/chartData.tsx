export const chartData = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [560, 540, 520, 400, 450, 510, 420, 580, 400, 320, 410, 220],
        backgroundColor: ["#2d3663"],
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#2d3663",
      },
      {
        label: "Purchases",
        data: [420, 300, 300, 200, 400, 400, 200, 300, 80, 40, 100, 10],
        backgroundColor: ["rgba(71,204,200,.4)"],
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgba(71,204,200,.4)",
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  },
};

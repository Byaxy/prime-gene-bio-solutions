export const cardsData = [
  {
    title: "Sales",
    total: "$85,700",
    data: {
      datasets: [
        {
          data: [60480, 25220],
          backgroundColor: ["#2d3663", "#EDF3F6"],
        },
      ],

      labels: ["Paid", "Pending"],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
  {
    title: "Quotations",
    total: "$105,480",
    data: {
      datasets: [
        {
          data: [105480],
          backgroundColor: ["#47ccc8"],
        },
      ],

      labels: ["Pending"],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
  {
    title: "Purchase",
    total: "$18,600",
    data: {
      datasets: [
        {
          data: [10480, 8120],
          backgroundColor: ["rgba(45,54,99,.75)", "#EDF3F6"],
        },
      ],

      labels: ["Complete", "Pending"],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
  {
    title: "Deliveries",
    total: "200",
    data: {
      datasets: [
        {
          data: [120, 60],
          backgroundColor: ["rgba(71,204,200,.5)", "#EDF3F6"],
        },
      ],

      labels: ["Complete", "Pending"],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
];

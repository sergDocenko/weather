export const options:any = {
  responsive: false,
  animations: {
    duration: 400,
  },
  scales: {
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
        dash: [7, 5],
      },
      grid: {
        color: "#313131",
        tickBorderDash: [5, 5],
        dash: [5, 5],
      },

      ticks: {
        padding: 10,
        color: "white",
      },

      beginAtZero: (context: any) => {
        const data = context.scale.chart.config._config.data.datasets[0].data;
        return data.find((item: number) => item < 0) ? false : true;
      },
      grace: "10%",
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "Max Temperature",
      backgroundColor: (context: any) => {
        const { ctx } = context.chart;
        const gradient = ctx.createLinearGradient(0, 0, 0, 340);
        gradient.addColorStop(0.5, "#B3FC4F");
        gradient.addColorStop(0.94, "#173102");
        gradient.addColorStop(1, "#111111");
        return gradient;
      },
      borderWidth: 5,
      borderColor: "transparent",
      borderRadius: 16,
    },
  ],
};

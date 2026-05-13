import Chart from "react-apexcharts";

import ChartContainer from "./ChartContainer";
import type { ChartOptions, LineChartProps } from "./chart.types";

const LineChart = ({
  title,
  series,
  categories,
  height = 350,
}: LineChartProps) => {
  const options: ChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: ["#000000"],

    grid: {
      borderColor: "#E2E8F0",
    },

    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#64748B",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#64748B",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      theme: "light",
    },
  };

  return (
    <ChartContainer title={title}>
      <Chart options={options} series={series} type="line" height={height} />
    </ChartContainer>
  );
};

export default LineChart;

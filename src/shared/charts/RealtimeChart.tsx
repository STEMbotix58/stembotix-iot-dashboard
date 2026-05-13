import Chart from "react-apexcharts";

import ChartContainer from "./ChartContainer";
import type { ChartOptions, RealtimeChartProps } from "./chart.types";

const RealtimeChart = ({
  title,
  series,
  categories,
  height = 350,
}: RealtimeChartProps) => {
  const options: ChartOptions = {
    chart: {
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 1000,
        },
      },

      toolbar: {
        show: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    colors: ["#16A34A"],

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories,
    },

    grid: {
      borderColor: "#E2E8F0",
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

export default RealtimeChart;

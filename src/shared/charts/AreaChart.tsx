import Chart from "react-apexcharts";

import ChartContainer from "./ChartContainer";
import type { AreaChartProps, ChartOptions } from "./chart.types";

const AreaChart = ({
  title,
  series,
  categories,
  height = 350,
}: AreaChartProps) => {
  const options: ChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    colors: ["#0F172A"],

    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories,
    },

    grid: {
      borderColor: "#E2E8F0",
    },
  };

  return (
    <ChartContainer title={title}>
      <Chart options={options} series={series} type="area" height={height} />
    </ChartContainer>
  );
};

export default AreaChart;

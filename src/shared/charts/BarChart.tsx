import Chart from "react-apexcharts";

import ChartContainer from "./ChartContainer";
import type { BarChartProps, ChartOptions } from "./chart.types";

const BarChart = ({
  title,
  series,
  categories,
  height = 350,
}: BarChartProps) => {
  const options: ChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    colors: ["#000000"],

    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
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
      <Chart options={options} series={series} type="bar" height={height} />
    </ChartContainer>
  );
};

export default BarChart;

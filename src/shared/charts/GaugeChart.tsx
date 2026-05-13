import Chart from "react-apexcharts";

import ChartContainer from "./ChartContainer";
import type { ChartOptions, GaugeChartProps } from "./chart.types";

const GaugeChart = ({ value, label, height = 320 }: GaugeChartProps) => {
  const options: ChartOptions = {
    chart: {
      type: "radialBar",
    },

    colors: ["#000000"],

    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%",
        },

        dataLabels: {
          name: {
            fontSize: "16px",
          },

          value: {
            fontSize: "32px",
            fontWeight: 700,
          },
        },
      },
    },

    labels: [label || "Value"],
  };

  return (
    <ChartContainer title={label}>
      <Chart
        options={options}
        series={[value]}
        type="radialBar"
        height={height}
      />
    </ChartContainer>
  );
};

export default GaugeChart;

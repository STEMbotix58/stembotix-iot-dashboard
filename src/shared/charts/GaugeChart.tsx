import Chart from "react-apexcharts";
import ChartContainer from "./ChartContainer";
import type { ChartOptions, GaugeChartProps } from "./chart.types";

const GaugeChart = ({
  value,
  label,
  height = 320,
  customOptions = {}, // Full control override
}: GaugeChartProps & { customOptions?: Partial<ChartOptions> }) => {
  const baseOptions: ChartOptions = {
    chart: {
      type: "radialBar",
      fontFamily: "Inter, sans-serif",
      sparkline: { enabled: true },
    },
    // Default to a clean Blue, but can be overridden
    colors: ["#2563EB"],
    plotOptions: {
      radialBar: {
        startAngle: -135, // Semi-circle look
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
          dropShadow: { enabled: false },
        },
        track: {
          background: "#F1F5F9", // Slate-100 track
          strokeWidth: "97%",
          margin: 5,
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#64748B",
            fontSize: "14px",
            fontWeight: 500,
          },
          value: {
            offsetY: 5,
            color: "#0F172A",
            fontSize: "30px",
            fontWeight: 700,
            show: true,
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#3B82F6"], // Subtle color shift
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round", // Makes the gauge end look premium
    },
    labels: [label || "Performance"],
  };

  const finalOptions = { ...baseOptions, ...customOptions };

  return (
    <ChartContainer title={label}>
      <Chart
        options={finalOptions}
        series={[value]}
        type="radialBar"
        height={height}
      />
    </ChartContainer>
  );
};

export default GaugeChart;

import Chart from "react-apexcharts";
import ChartContainer from "./ChartContainer";
import type { AreaChartProps, ChartOptions } from "./chart.types";

const AreaChart = ({
  title,
  series,
  categories,
  height = 350,
  customOptions = {}, // Provides 100% API access
}: AreaChartProps & { customOptions?: Partial<ChartOptions> }) => {
  const baseOptions: ChartOptions = {
    chart: {
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
      sparkline: { enabled: false },
      zoom: { enabled: false },
    },
    // Modern Indigo/Violet primary color
    colors: ["#4F46E5", "#10B981", "#F59E0B"],
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.02,
        stops: [0, 90, 100], // Creates a smooth fade-to-nothing look
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        offsetY: 5,
        style: {
          colors: "#94A3B8",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 4, // Dashed lines look cleaner for Area charts
      padding: {
        left: 10,
        right: 10,
      },
    },
    tooltip: {
      theme: "light",
      x: { show: true },
      style: { fontSize: "12px" },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: { size: 12 },
    },
  };

  // Merge base theme with custom overrides
  const finalOptions = { ...baseOptions, ...customOptions };

  return (
    <ChartContainer title={title}>
      <Chart
        options={finalOptions}
        series={series}
        type="area"
        height={height}
      />
    </ChartContainer>
  );
};

export default AreaChart;

import Chart from "react-apexcharts";
import ChartContainer from "./ChartContainer";
import type { ChartOptions, LineChartProps } from "./chart.types";

const LineChart = ({
  title,
  series,
  categories,
  height = 350,
  customOptions = {}, // The key to full control
}: LineChartProps & { customOptions?: Partial<ChartOptions> }) => {
  const baseOptions: ChartOptions = {
    chart: {
      fontFamily: "Inter, system-ui, sans-serif",
      toolbar: { show: true },
      zoom: { enabled: false },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    // Vibrant colors for telemetry lines
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: "round",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100],
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 4,
      padding: {
        left: 20,
        right: 20,
      },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
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
    tooltip: {
      theme: "light",
      x: { show: true },
      marker: { show: true },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    dataLabels: {
      enabled: false,
    },
  };

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

export default LineChart;

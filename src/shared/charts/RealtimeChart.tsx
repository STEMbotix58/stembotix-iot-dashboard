import Chart from "react-apexcharts";
import ChartContainer from "./ChartContainer";
import type { ChartOptions, RealtimeChartProps } from "./chart.types";

const RealtimeChart = ({
  title,
  series,
  categories,
  height = 350,
  customOptions = {},
}: RealtimeChartProps & { customOptions?: Partial<ChartOptions> }) => {
  const baseOptions: ChartOptions = {
    chart: {
      id: "realtime-light",
      fontFamily: "Inter, -apple-system, sans-serif",
      background: "transparent",
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    colors: ["#2563EB", "#059669", "#7C3AED"],
    stroke: {
      curve: "smooth",
      width: 3,
      lineCap: "round",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90],
      },
    },
    markers: {
      size: 0,
      hover: { size: 5 },
    },
    xaxis: {
      categories,
      range: 7,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "11px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8",
          fontSize: "11px",
        },
        formatter: (val: number) => val.toFixed(0),
      },
    },
    grid: {
      borderColor: "#F1F5F9", // Very light grey
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      padding: { top: 10, right: 10, bottom: 0, left: 10 },
    },
    tooltip: {
      theme: "light",
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => (y != null ? `${y.toFixed(1)} units` : ""),
      },
      style: { fontSize: "12px" },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "13px",
      fontWeight: 600,
      markers: { size: 12, offsetX: -4 },
      itemMargin: { horizontal: 10 },
    },
    dataLabels: {
      enabled: false,
    },
  };

  // Shallow merge is usually enough, but deepmerge is better for nested Apex objects
  const finalOptions = { ...baseOptions, ...customOptions };

  return (
    <ChartContainer title={title}>
      <Chart
        options={finalOptions}
        series={series}
        type="area" // 'area' gives us that nice light gradient fill
        height={height}
      />
    </ChartContainer>
  );
};

export default RealtimeChart;

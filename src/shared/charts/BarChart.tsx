import Chart from "react-apexcharts";
import ChartContainer from "./ChartContainer";
import type { BarChartProps, ChartOptions } from "./chart.types";

const BarChart = ({
  title,
  series,
  categories,
  height = 350,
  customOptions = {}, // Prop to allow overriding everything
}: BarChartProps & { customOptions?: Partial<ChartOptions> }) => {
  const baseOptions: ChartOptions = {
    chart: {
      fontFamily: "Inter, system-ui, sans-serif",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    // Modern palette: Blue, Indigo, Teal
    colors: ["#3B82F6", "#6366F1", "#14B8A6"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "60%",
        distributed: false,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val: number) => `${val} units`,
      },
      style: { fontSize: "12px" },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "14px",
      markers: { size: 6 },
    },
  };

  // Merge base options with any custom overrides passed via props
  const finalOptions = { ...baseOptions, ...customOptions };

  return (
    <ChartContainer title={title}>
      <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <Chart
          options={finalOptions}
          series={series}
          type="bar"
          height={height}
        />
      </div>
    </ChartContainer>
  );
};

export default BarChart;

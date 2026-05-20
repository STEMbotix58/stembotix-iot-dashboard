import LineChart from "@/shared/charts/LineChart";

type Props = {
  title: string;
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
};

const AnalyticsChart = ({ title, series, categories }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <LineChart title={title} series={series} categories={categories} />
    </div>
  );
};

export default AnalyticsChart;

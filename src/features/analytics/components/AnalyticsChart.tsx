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
    <div>
      <LineChart title={title} series={series} categories={categories} />
    </div>
  );
};

export default AnalyticsChart;

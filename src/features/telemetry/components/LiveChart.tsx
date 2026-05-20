import LineChart from "@/shared/charts/LineChart";

type Props = {
  title: string;
  data: number[];
  categories: string[];
};

const LiveChart = ({ title, data, categories }: Props) => {
  return (
    <LineChart
      title={title}
      series={[
        {
          name: title,
          data,
        },
      ]}
      categories={categories}
    />
  );
};

export default LiveChart;

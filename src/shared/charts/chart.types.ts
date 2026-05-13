import type { ApexOptions } from "apexcharts";

export interface BaseChartProps {
  title?: string;
  height?: number;
  categories?: string[];
}

export interface LineChartProps extends BaseChartProps {
  series: {
    name: string;
    data: number[];
  }[];
}

export interface AreaChartProps extends BaseChartProps {
  series: {
    name: string;
    data: number[];
  }[];
}

export interface BarChartProps extends BaseChartProps {
  series: {
    name: string;
    data: number[];
  }[];
}

export interface GaugeChartProps {
  value: number;
  label?: string;
  height?: number;
}

export interface RealtimeChartProps extends BaseChartProps {
  series: {
    name: string;
    data: number[];
  }[];
}

export interface ChartContainerProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export type ChartOptions = ApexOptions;

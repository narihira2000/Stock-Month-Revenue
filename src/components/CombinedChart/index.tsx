import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { ChartData } from '@/types/chart';

function CombinedChart({
  labels,
  barData,
  lineData,
}: {
  labels: Date[];
  barData: ChartData;
  lineData: ChartData;
}) {
  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: barData.label,
        data: barData.data,
        backgroundColor: 'rgba(232, 175, 0, 0.2)',
        borderColor: 'rgb(232, 175, 0)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: lineData.label,
        data: lineData.data,
        borderColor: 'rgb(203, 75, 75)',
        backgroundColor: 'rgb(203, 75, 75)',
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          tooltipFormat: 'yyyyMM' as const,
        },
        ticks: {
          callback: function (value: string | number, index: number) {
            // transform the timestamp to Date
            const date = new Date(value);
            return date.getMonth() === 0 || index === 0
              ? date.getFullYear()
              : '';
          },
        },
      },
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: barData.axisTitle,
          align: 'end' as const,
        },
      },
      y1: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: lineData.axisTitle,
          align: 'end' as const,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

export default CombinedChart;

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export const ChartPieComponent = ({data}) => {
  return (
    <PieChart
      series={[
        {
          data: data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={300}
      width={500}
    />
  );
}


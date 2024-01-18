import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

const data1 = [
  {
    axis: 'Angel',
    count: 10,
  },
  {
    axis: 'Miguel',
    count: 30,
  },
    {
    axis: 'joely',
    count: 60,
  },
  {
    axis: 'Victoria',
    count: 24,
  },
    {
    axis: 'Camila',
    count: 12,
  },
  {
    axis: 'Maria',
    count: 0,
  },
    {
    axis: 'Simon',
    count: 1,
  },
  {
    axis: 'Carlos',
    count: 3,
  },

]


export const ChartBarComponent = ({data}) => {
  const xAxisData = data.map(item => item.axis);
  const seriesData = [{ data: data.map(item => item.count) }];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={seriesData.map((serie, index) => ({
        ...serie,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // ¡Un toque de magia para cada barra!
      }))}
      width={500}
      height={300}
      axisHighlight={{
        x: 'line',
        y: 'none',
      }}
    />
  );
};

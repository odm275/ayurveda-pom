import { AnyTxtRecord } from 'dns';
import React from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from '@/lib/hooks/useChartDimensions';

import { PomEntry } from '@/lib/types';
import { Chart } from '@/lib/components/Chart/Chart';
import { Line } from '@/lib/components/Chart/Line';
import Axis from '@/lib/components/Chart/Axis';
import LineMarker from '@/lib/components/Chart/LineMarker';

interface Props {
  data: any;
  xAccessor: any;
  yAccessor: any;
}

const formatDate = d3.timeFormat('%-b %-d');

export const Timeline = ({ data, xAccessor, yAccessor }: Props) => {
  const [ref, dms] = useChartDimensions();

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dms.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dms.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  function generateDaysInRange({ lowBoundStr, upperBoundStr }) {
    if (!lowBoundStr || upperBoundStr) {
      return d3.timeDays(new Date(), new Date());
    }
    const dateRange = d3.timeDays(
      new Date(lowBoundStr),
      new Date(upperBoundStr)
    );
    return dateRange;
  }

  // data is sorted. Hence, it is enough to get 1st and last elements for range.

  const dateRange = generateDaysInRange({
    lowBoundStr: data[0]?.date,
    upperBoundStr: data[data.length - 1]?.date
  });

  const firstDayOfMonths = dateRange.filter((date) => date.getDate() === 1);

  const markers = firstDayOfMonths.map((day, i) => {
    const xAccessorScaled = xScale(day);
    const text = months[day.getMonth()];
    return (
      <LineMarker
        key={i}
        x1={xAccessorScaled}
        x2={xAccessorScaled}
        y1={-15}
        y2={dms.boundedHeight}
        text={text}
      />
    );
  });

  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dms}>
        <Line
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
        <Axis dimension="x" scale={xScale} formatTick={formatDate} />
        <Axis dimension="y" scale={yScale} label="Temperature" />
        {markers}
      </Chart>
    </div>
  );
};

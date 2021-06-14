import { AnyTxtRecord } from 'dns';
import React from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from '@/lib/hooks/useChartDimensions';

import { PomEntry } from '@/lib/types';
import { Chart } from '@/lib/components/Chart/Chart';
import { Line } from '@/lib/components/Chart/Line';
import Axis from '@/lib/components/Chart/Axis';

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
      </Chart>
    </div>
  );
};

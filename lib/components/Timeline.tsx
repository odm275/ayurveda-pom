import { AnyTxtRecord } from 'dns';
import React from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from '@/lib/hooks/useChartDimensions';

import { PomData } from '../types';
import { Chart } from '@/lib/components/Chart/Chart';
import { Line } from '@/lib/components/Chart/Line';

interface Props {
  data: PomData;
  xAccessor: any;
  yAccessor: any;
}

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
      </Chart>
    </div>
  );
};

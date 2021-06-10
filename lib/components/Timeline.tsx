import { AnyTxtRecord } from 'dns';
import React from 'react';
import d3 from 'd3';
import { useChartDimensions } from '@/lib/hooks/useChartDimensions';
import { useAuth } from '@/lib/context/AuthContext';

import { PomData } from '../types';

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
          data={data.result}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  );
};

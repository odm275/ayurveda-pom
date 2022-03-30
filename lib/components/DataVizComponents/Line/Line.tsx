import React, { ReactElement } from "react";
import * as d3 from "d3";

interface MyData {
  yData: number;
  xData: number;
}

interface Props {
  type?: "line" | "area";
  data: any;
  xAccessor: (any) => number;
  yAccessor: (any) => number;
  y0Accessor?: any;
  interpolation?: d3.CurveFactory;
}

export const Line = ({
  type = "line",
  data,
  xAccessor,
  yAccessor,
  y0Accessor = "0",
  interpolation = d3.curveMonotoneX,
  ...props
}: Props): ReactElement => {
  let lineGenerator;

  if (type === "line") {
    lineGenerator = d3
      .line<MyData>()
      .x(xAccessor)
      .y(yAccessor)
      .curve(interpolation);
  }

  if (type === "area") {
    lineGenerator = d3
      .area<MyData>()
      .x(xAccessor)
      .y(yAccessor)
      .curve(interpolation);
    lineGenerator.y0(y0Accessor).y1(yAccessor);
  }

  const line = lineGenerator(data);

  return <path {...props} className={`Line Line--type-${type}`} d={line} />;
};

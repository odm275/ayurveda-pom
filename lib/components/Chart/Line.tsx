import React, { ReactElement } from "react";
import * as d3 from "d3";

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
  const lineGenerator = d3[type]()
    .x(xAccessor)
    .y(yAccessor)
    .curve(interpolation);

  if (type == "area") {
    lineGenerator.y0(y0Accessor).y1(yAccessor);
  }

  const line = lineGenerator(data);

  return <path {...props} className={`Line Line--type-${type}`} d={line} />;
};

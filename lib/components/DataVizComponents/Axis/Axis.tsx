import React from "react";
import { AxisHorizontal, AxisVertical } from "./components";
import { useDimensionsContext } from "../Chart";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical
};

enum Dimension {
  x = "x",
  y = "y"
}
interface Props {
  dimension: Dimension;
  scale: () => void;
}

export const Axis = ({ dimension, ...props }: any) => {
  const dimensions = useDimensionsContext();
  const AxisComponent = axisComponentsByDimension[dimension];
  if (!AxisComponent) return null;

  return <AxisComponent {...props} dimensions={dimensions} />;
};

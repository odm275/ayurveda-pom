import { responsiveTicks } from "./utils";
import * as d3 from "d3";

interface Props {
  dimensions: any;
  label: string;
  formatTick: any;
  scale: d3.ScaleTime<number, number, never>;
}

export function AxisHorizontal({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}: Props) {
  const numberOfTicks = responsiveTicks(dimensions);

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g
      className="Axis AxisHorizontal"
      {...props}
      transform={`translate(0, ${dimensions.boundedHeight})`}
    >
      <line className="Axis__line" x2={dimensions.boundedWidth} />
      {ticks.map((tick, i) => (
        <text
          key={i}
          className="Axis__tick"
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick(tick)}
        </text>
      ))}
      {label && (
        <text
          className="Axis__label"
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

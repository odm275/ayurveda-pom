interface Props {
  dimensions: any;
  label: string;
  formatTick: any;
  scale: d3.ScaleTime<number, number, never>;
}

export function AxisVertical({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}: Props) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className="Axis AxisVertical" {...props}>
      <line className="Axis__line" y2={dimensions.boundedHeight} />

      {ticks.map((tick, i) => (
        <text
          key={i}
          className="Axis__tick"
          transform={`translate(-16, ${scale(tick)})`}
        >
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          className="Axis__label"
          style={{
            transform: `translate(-56px, ${
              dimensions.boundedHeight / 2
            }px) rotate(-90deg)`
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

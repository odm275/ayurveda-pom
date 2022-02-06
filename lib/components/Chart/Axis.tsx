import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useDimensionsContext } from './Chart';

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical
};

enum Dimension {
  x = 'x',
  y = 'y'
}
interface Props {
  dimension: Dimension;
  scale: () => void;
}

const Axis = ({ dimension, ...props }) => {
  const dimensions = useDimensionsContext();
  const Component = axisComponentsByDimension[dimension];
  if (!Component) return null;

  return <Component {...props} dimensions={dimensions} />;
};

Axis.propTypes = {
  dimension: PropTypes.oneOf(['x', 'y']),
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func
};

const formatNumber = d3.format(',');
Axis.defaultProps = {
  dimension: 'x',
  scale: null,
  formatTick: formatNumber
};

export default Axis;

function responsiveTicks(dimensions) {
  const { boundedWidth } = dimensions;
  const mobileS = boundedWidth < 375;
  const mobileM = boundedWidth >= 375 && boundedWidth < 425;
  const mobileL = boundedWidth >= 425 && boundedWidth < 768;
  const tablet = boundedWidth >= 768 && boundedWidth < 1024;
  const laptopS = boundedWidth >= 1024 && boundedWidth < 1440;
  const largerDevices = boundedWidth > 1440;

  if (mobileS) return 8;
  if (mobileM) return 10;
  if (mobileL) return 11;
  if (tablet) return dimensions.boundedWidth / 50;
  if (laptopS) return dimensions.boundedWidth / 50;
  if (largerDevices) return dimensions.boundedWidth / 50;
}

function AxisHorizontal({ dimensions, label, formatTick, scale, ...props }) {
  // const numberOfTicks =
  //   dimensions.boundedWidth < 600
  //     ? dimensions.boundedWidth / 41
  //     : dimensions.boundedWidth / 50;

  const numberOfTicks = responsiveTicks(dimensions);

  const ticks = scale.ticks(numberOfTicks);
  console.log('ticks', numberOfTicks, ticks);

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

function AxisVertical({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className="Axis AxisVertical" {...props}>
      <line className="Axis__line" y2={dimensions.boundedHeight} />

      {ticks.map((tick, i) => (
        <text
          key={tick}
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

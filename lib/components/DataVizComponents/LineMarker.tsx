import React from "react";

interface Props {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  text: string;
}

export const LineMarker = ({ x1, x2, y1, y2, text }: Props) => {
  return (
    <>
      <line
        x1={x1}
        x2={x2}
        y1={-15}
        y2={y2}
        strokeDasharray="5px 4px"
        stroke="#333333"
      ></line>
      <text
        x={x1}
        y={0}
        fill="#999999"
        fontSize={12}
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        {text}
      </text>
    </>
  );
};

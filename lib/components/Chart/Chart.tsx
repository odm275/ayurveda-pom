import { createContext, useContext } from "react";

const ChartContext = createContext(null);
export const useDimensionsContext = () => useContext(ChartContext);

interface dimensionsType {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}
interface Props {
  dimensions: dimensionsType;
  children: any;
}

export const Chart = ({ dimensions, children }: Props) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

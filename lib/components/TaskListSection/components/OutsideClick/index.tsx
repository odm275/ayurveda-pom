import { useRef, ReactNode } from "react";
import { useOutsideNode } from "./hooks";
/**
 * Component that alerts if you click outside of it
 */

interface Props {
  children: ReactNode;
  setLastDraggedIndex: any;
}

export function OutsideClick({ children, setLastDraggedIndex }: Props) {
  const wrapperRef = useRef(null);
  useOutsideNode(wrapperRef, setLastDraggedIndex);

  return (
    <div className="outside-click-container" ref={wrapperRef}>
      {children}
    </div>
  );
}

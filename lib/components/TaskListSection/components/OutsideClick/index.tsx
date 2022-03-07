import React, { useRef } from "react";
import { useOutsideNode } from "./hooks";
/**
 * Component that alerts if you click outside of it
 */

export function OutsideClick({ children, setLastDraggedIndex }) {
  const wrapperRef = useRef(null);
  useOutsideNode(wrapperRef, setLastDraggedIndex);

  return (
    <div className="outside-click-container" ref={wrapperRef}>
      {children}
    </div>
  );
}

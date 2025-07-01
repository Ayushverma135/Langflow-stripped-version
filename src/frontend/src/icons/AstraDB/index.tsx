// AstraDB icon component modified to show disabled state
import { forwardRef } from "react";
// import AstraSVG from "./AstraDB";
// import { useDarkStore } from "@/stores/darkStore";

export const AstraDBIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  // Return an empty SVG as a placeholder
  return (
    <svg ref={ref} width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#ddd" />
      <text x="12" y="14" textAnchor="middle" fontSize="8" fill="#999">
        Disabled
      </text>
    </svg>
  );
});

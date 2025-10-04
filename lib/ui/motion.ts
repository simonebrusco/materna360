export const EASE = "cubic-bezier(.2,.7,.2,1)";
export const DURATION = ".25s";

export const MOTION_OK = typeof window === "undefined"
  ? true
  : !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const hoverLift = {
  transition: `transform ${DURATION} ${EASE}, box-shadow ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`,
  transform: "translateY(0)",
  willChange: "transform",
};

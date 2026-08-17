import type { ElementType } from "react";

export interface Segment {
  text: string;
  underline?: boolean;
}

export interface TechItem {
  name: string;
  text: string;
  icon: ElementType;
}

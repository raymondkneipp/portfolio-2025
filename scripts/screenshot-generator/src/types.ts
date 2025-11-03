import React from "react";

export interface ShadowConfig {
  offsetX?: number;
  offsetY?: number;
  blur?: number;
  color?: string;
  opacity?: number;
}

export interface ImageConfig {
  colorScheme?: "light" | "dark" | "no-preference";
  themeColor?: string;
  viewport?: { width: number; height: number };
  borderRadius?: number;
  padding?: number;
  shadow?: ShadowConfig;
}

export interface ClickStep {
  type: "click";
  selector?: string;
  text?: string;
  ariaLabel?: string;
  role?: string;
  name?: string;
  waitAfter?: number;
}

export interface WaitStep {
  type: "wait";
  duration: number;
}

export interface TypeStep {
  type: "type";
  selector: string;
  text: string;
  waitAfter?: number;
}

export type StepType = ClickStep | WaitStep | TypeStep;

export interface ScreenshotItem {
  url: string;
  crop?: { x: number; y: number; width: number; height: number };
  scrollTo?: number;
  steps?: StepType[];
  viewport?: { width: number; height: number };
}

// Allow screenshots to be either simple strings or full configuration objects
export type ScreenshotInput = string | ScreenshotItem;

export interface Project {
  name: string;
  liveUrl: string;
  codeUrl?: string;
  description: string;
  technologies: string[];
  cookieFile?: string;
  imagesConfig: ImageConfig;
  screenshots: ScreenshotInput[];
  coverImage?: {
    columns?: number;
    columnAngle: number;
    screenshots: ScreenshotInput[];
  };
}

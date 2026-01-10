declare module 'react-joyride' {
  import * as React from 'react';

  export interface Step {
    target: string | HTMLElement;
    content: React.ReactNode;
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'auto' | 'center';
    disableBeacon?: boolean;
    title?: React.ReactNode;
    styles?: any;
  }

  export interface CallBackProps {
    action: string;
    controlled: boolean;
    index: number;
    lifecycle: string;
    size: number;
    status: string;
    step: Step;
    type: string;
  }

  export interface Props {
    steps: Step[];
    run: boolean;
    continuous?: boolean;
    showProgress?: boolean;
    showSkipButton?: boolean;
    callback?: (data: CallBackProps) => void;
    styles?: any;
    hideCloseButton?: boolean;
    scrollToFirstStep?: boolean;
    scrollOffset?: number;
    disableOverlayClose?: boolean;
    spotlightPadding?: number;
    floaterProps?: any;
    locale?: any;
  }

  export const STATUS: {
    IDLE: string;
    READY: string;
    WAITING: string;
    RUNNING: string;
    PAUSED: string;
    FINISHED: string;
    SKIPPED: string;
    ERROR: string;
  };

  export default class ReactJoyride extends React.Component<Props> { }
}

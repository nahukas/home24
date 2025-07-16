import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      inputBackground: string;
      text: string;
      border: string;
    };
    space: number[];
    breakpoints: string[];
    fontSizes: number[];
  }
}

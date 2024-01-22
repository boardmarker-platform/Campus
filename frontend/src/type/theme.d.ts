import '@emotion/react';
import { Colors, Size } from 'styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    size: Size;
  }
}

import {css} from 'lit';

export enum DeviceState {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
  XLARGE = 3,
  XXLARGE = 4,
  XXXLARGE = 5,
}

export const mediaQueries = {
  SMALL: css`(min-width: 480px)`,
  MEDIUM: css`(min-width: 768px)`,
  LARGE: css`(min-width: 1024px)`,
  XLARGE: css`(min-width: 1200px)`,
  XXLARGE: css`(min-width: 1600px)`,
  XXXLARGE: css`(min-width: 1920px)`,
};

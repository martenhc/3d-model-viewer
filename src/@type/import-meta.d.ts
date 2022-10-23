import {Environment} from '../data/enum';

declare global {
  interface ImportMeta {
    env: {
      MODE: Environment.DEVELOPMENT | Environment.PRODUCTION;
    };
  }
}

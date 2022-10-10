import {Environment} from '../data/enum';

declare global {
  interface ImportMeta {
    env: {
      MODE: Environment.DEVELOPMENT | Environment.PRODUCTION;
      VAR_IS_LOCALE_ENABLED: string;
      VAR_STATIC_ROOT: string;
    };
  }
}

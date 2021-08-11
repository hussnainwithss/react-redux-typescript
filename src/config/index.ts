const { REACT_APP_IS_PRODUCTION, REACT_APP_API_URL, REACT_APP_SENTRY_URL } =
  process.env;
export const IS_PRODUCTION:boolean = REACT_APP_IS_PRODUCTION === 'true';
export const API_BASE_PATH:string|undefined = REACT_APP_API_URL?.toString();
export const SENTRY_URL:string|undefined = REACT_APP_SENTRY_URL?.toString();
export const APP_NAME:string = 'UBook';
export const COOKIE_USER_TOKEN_FIELD:string = 'authToken';

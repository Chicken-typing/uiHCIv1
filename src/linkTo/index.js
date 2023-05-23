// todo: DEFAULT API FORMAT: `${BASE_URL}/route`
export const BASE_URL = `${process.env.REACT_APP_API_URL}/api`;
// export const BASE_URL = "http://localhost:5000/api";
// Statistic
export const API_ADMIN_STATISTIC = `${BASE_URL}/orders/summary`;

export const API_PRODUCT = `${BASE_URL}/products`;
export const API_ORDER = `${BASE_URL}/orders`;
export const API_ADVERTISE = `${BASE_URL}/products`;
export const API_USER = `${BASE_URL}/users`;
export const API_CHAT_ROOM = `${BASE_URL}/room`;

// For user
export const API_SIGNUP = `${BASE_URL}/users/signup`;
export const API_SIGNIN = `${BASE_URL}/users/signin`;
export const VALIDATE_TOKEN = `${process.env.REACT_APP_API_URL}/vtoken`;
export const VALIDATE_EMAIL =  `${process.env.REACT_APP_API_URL}/forgot`
export const VALIDATE_OTP =  `${process.env.REACT_APP_API_URL}/forgot/validate-code`
export const RESET_PASSWORD = `${process.env.REACT_APP_API_URL}/forgot/reset-password`
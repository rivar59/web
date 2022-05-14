const BASE_URL = 'http://127.0.0.1:5000';
const API_ENDPOINT = `${BASE_URL}/api`;
const AUTH_ENDPOINT = `${BASE_URL}/auth`;

const COMMENTS_ENDPOINT = `${API_ENDPOINT}/comments`;
const USERS_ENDPOINT = `${API_ENDPOINT}/users`;

const LOGIN_ENDPOINT = `${AUTH_ENDPOINT}/login`;
const REGISTER_ENDPOINT = `${AUTH_ENDPOINT}/register`;

const constants = {
  BASE_URL,
  API_ENDPOINT,
  COMMENTS_ENDPOINT,
  USERS_ENDPOINT,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
};

export default constants;

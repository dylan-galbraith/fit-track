// export const API_URL = 'http://localhost:8070';
export const API_URL = process.env.NODE_ENV === "production"
  ? 'https://fit-track-dylan.herokuapp.com'
  : 'http://localhost:8070';
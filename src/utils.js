export const getBaseApiUrl = () =>
  location.hostname === "localhost"
    ? "http://localhost:3000/api/"
    : `http://${location.hostname}/api/`;

export const getBaseUrl = () =>
  location.hostname === "localhost"
    ? "http://localhost:8080/"
    : `http://${location.hostname}/`;

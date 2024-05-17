import axios from "axios";

export const baseUrl = "http://localhost:3001/api";

let api = axios.create({ baseURL: baseUrl });

const fetchApi = async (url, method, data = "") => {
  const FULL_URL = baseUrl + url;

  let axiosOptions = {
    method: method.toUpperCase(),
  };

  if (data) {
    axiosOptions.data = data;
  }

  try {
    const response = await api(FULL_URL, axiosOptions);
    console.log("data.......", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchApi };

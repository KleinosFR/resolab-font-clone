import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: `http://localhost:8089/api`,
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
    Accept: "application/json"
  }
});

export default AxiosInstance;

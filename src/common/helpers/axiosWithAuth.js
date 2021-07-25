import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://sauti-market-bw.herokuapp.com/api/",
    // baseURL: "http://localhost:5500",
    headers: {
      "Access-Control-Allow-Credentials": true,
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `${token}` 
    }
  });
}

export default axiosWithAuth;
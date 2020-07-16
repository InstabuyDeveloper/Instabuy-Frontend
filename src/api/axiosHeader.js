import axios from "axios";
import BACKEND_URL from "./URL";

const axiosHeader = axios.create({
    baseURL: `${BACKEND_URL}`,
    timeout: 8000,
    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
});

export default axiosHeader;
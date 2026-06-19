import axios from "axios";
import {BASE_URL} from "../config/config";


const axiosInstance=axios.create()


axiosInstance.defaults.baseURL=BASE_URL



export default axiosInstance;
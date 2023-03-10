import axios from "axios";
import { BASEURL } from "../constants/baseUrl";
export const axiosPublic = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

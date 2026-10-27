import axios from "axios"
const token = localStorage.getItem('token');
const isLocal = window.location.hostname === "localhost";

const baseURL = isLocal
  ? "http://localhost:8080"
  : "https://mernstackpoc-hjd6a4djhfajavfn.centralindia-01.azurewebsites.net";
const api= axios.create({
    baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export default api
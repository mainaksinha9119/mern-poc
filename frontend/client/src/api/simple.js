import axios from "axios"

const api= axios.create({
     baseURL: 'https://mernstackpoc-hjd6a4djhfajavfn.centralindia-01.azurewebsites.net', // Your local API endpoint
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api
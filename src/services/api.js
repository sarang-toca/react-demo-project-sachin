import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2001",
  withCredentials: false,
  crossDomain: true,
  headers: {
    'Authorization': "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    
  },
});


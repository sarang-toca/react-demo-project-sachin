// import axios from "axios";

// const setAuthToken = token => {
//   if (token) {
//     // Apply authorization token to every request if logged in
//     axios.defaults.headers.common["."] = token;
//   } else {
//     // Delete auth header
//     delete axios.defaults.headers.common["."];
//   }
// };

// export default setAuthToken;


export default function setAuthToken() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
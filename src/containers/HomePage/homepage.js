import React from "react"
import "./homepage.css"
import { baseUrl } from '../assets/js/helpers';
const Homepage = () => {
    const logout = () => {
        window.localStorage.clear();
        window.location.href = baseUrl + "login";
      }
    return (
        <div className="homepage">
            <h1>Hello Homepage</h1>
            <button onClick={logout}>Logout</button>
            {/* <div className="button" onClick={() => setLoginUser({})} >Logout</div> */}
        </div>
    )
}

export default Homepage
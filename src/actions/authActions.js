import api from "../services/api";
import { toast } from "react-toastify";
import * as actions from "./index";
 import jwtDecode from "jwt-decode";
 import { getUser } from './actions';

export const register = (user) => {
  return (dispatch) => {
    dispatch(actions.userSignupRequest());
    api
      .post(`v1/auth/register`, user)
      .then((token) => {
        localStorage.setItem("token", token.data.tokens.access.token);
        dispatch(actions.userSignupSuccess(token));
       
       
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(actions.userSignupFailure(errorMessage,"danger"));
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};



// export const loadUser = (refreshToken,user) => {
//   return (dispatch) => {
//     dispatch(actions.loadUserRequest());
//     api
//       .post("/v1/auth/refresh-tokens", refreshToken,user)
//       .then((token) => {
//         console.log(refreshToken)
//         localStorage.setItem("token", token.data.access.token);
//          localStorage.setItem("refreshToken", token.data.refresh.token);
        
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         dispatch(actions.loadUserFailure(errorMessage));
//         toast.error(error.errorMessage, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       });
//   };
// };


export const loadUser = (refreshToken) => {
  return (dispatch) => {
    dispatch(actions.loadUserRequest());
    api
      .post("/v1/auth/refresh-tokens", refreshToken)
      .then((token) => {
        // localStorage.setItem("token", token.data.tokens.access.token);
        localStorage.setItem("refreshTokens", token.data.tokens.refresh.token);
        dispatch(actions.loadUserSuccess(token));
        const { sub: userId } = jwtDecode(token.data.tokens.access.token);
        console.log(userId);
        const loadUserDetails = (userId) => {
          api.get(`/v1/users/${userId}`).then((results) => {
            console.log(results.data);
            dispatch(getUser(results.data))
            // dispatch(actions.loadUserSuccess(user.data));
          });
        };
        loadUserDetails(userId);

        // console.log("sachin",refreshToken)
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(actions.loadUserFailure(errorMessage));
        toast.error(error.errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const login = (user, refreshToken) => {
  return (dispatch) => {
    dispatch(actions.userLoginRequest());
    api
      .post(`v1/auth/login`, user)
      .then((token) => {
        // console.log(token)
        localStorage.setItem("token", token.data.tokens.access.token);
        localStorage.setItem("refreshTokens", token.data.tokens.refresh.token);
        dispatch(actions.userLoginSuccess(token));

        api
        .post("/v1/auth/refresh-tokens", refreshToken)
        .then((token) => {
          // localStorage.setItem("token", token.data.tokens.access.token);
          localStorage.setItem("refreshToken", token.data.tokens.refresh.token);
          dispatch(actions.loadUserSuccess(token));
          
          
          // console.log("sachin",refreshToken)
        })
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(actions.userLoginFailure(errorMessage));
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};


export const logOut = () => {
  localStorage.removeItem("token");
   localStorage.removeItem("refreshToken");
  localStorage.removeItem("redux");
  return (dispatch) => {
    dispatch(actions.userLogout());
  };
};

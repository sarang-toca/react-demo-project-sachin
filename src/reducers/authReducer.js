import * as actionTypes from "../actions/actionTypes";
import { userConstants } from "../constants/userConstants";
const initialState = {
  loading: false,
  isLoggedIn: !!localStorage.getItem("token"),
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
    role: "",
    refreshToken: ""
  },
  users: [],
 
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP_REQUEST:
    case actionTypes.USER_RELOAD_REQUEST:
    case actionTypes.USER_LOGIN_REQUEST:

      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
    case actionTypes.USER_LOGIN_SUCCESS:
  
    {
      const token = action.payload.data.tokens.access.token;
      const user = action.payload.data.user;
        // const result = action.payload.data.result;
      return {
        ...state,
        loading: false,
        isLoggedIn: !!localStorage.getItem("token"),
       
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
      };
    }
    
    case actionTypes.USER_RELOAD_SUCCESS: {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const user = action.payload; 
      return {
        ...state,
        loading: false,
        isLoggedIn: !!localStorage.getItem("token"),
        // isLoggedIn: !!localStorage.getItem("refreshToken"),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
          refreshToken
        },
      };
    }
    case actionTypes.USER_SIGNUP_FAILURE:
    case actionTypes.USER_RELOAD_FAILURE:
    case actionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.USER_LOGOUT: {
      return { ...initialState, isLoggedIn: false };
    }
    case userConstants.UPDATEADMIN_REQUEST:
      return {
        isLoggedIn: true,
        user: state.user,
      };
    case userConstants.UPDATEADMIN_SUCCESS:
      {
      const updatedUser = state.user;
      // updatedUser.user = action.user;

      Object.assign(updatedUser.user, action.user);
      return {
        isLoggedIn: true,
        user: updatedUser,
      };
    }
    case userConstants.UPDATEADMIN_FAILURE:
      return {
        isLoggedIn: true,
        user: state.user,
      };
    default:
      return state;
  }
};

export default authReducer;
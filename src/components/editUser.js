// import React, { useEffect, useState } from "react";
// import { editImages, updateImages } from '../actions/creators';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams,  useHistory } from 'react-router-dom';
// import {
//   makeStyles,
//   TextField,
//   Button,
//   // CircularProgress,
// } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "50ch",
//     },
//     buttonProgress: {
//       color: "#fff",
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       marginTop: -12,
//       marginLeft: -12,
//     },
//   },
// }));

// const editUser = () => {
//     const dispatch = useDispatch();
//     const classes = useStyles();
//     const { id } = useParams();
//     const history = useHistory();
//     const [state, setState] = useState({
//         name: '',
//         email: '',
//         profileImg: ''
        
        
//     }
//     );
//     // const loading = useSelector((state) => state.users?.loading);
//     // console.log(loading)
//     const  result  = useSelector((state) => state.user);
//     console.log(result)
//     useEffect(() => {
//         dispatch(editImages(result,history));
//     }, [editImages]);

//     useEffect(() => {
//         if (result) {
//             setState({ ...result });
//         }
//     }, [result]);

//     const { name, email } = state;

//     const handleTextChange = e => {
//         const { name, value } = e.target;
//         setState({ ...state, [name]: value });
//         console.log(state);
//     }

//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         // const formData = new FormData();
//         // formData.append('profileImage', formData.profileImage);
//         // formData.append('email', formData.email);
//         // formData.append('name', formData.name);
//         // const payload  = {id, formData }
//         dispatch(updateImages(result, state, id, history));
//     }

//     const handlePhoto = (e) => {
//         setState({...state, profileImg: e.target.files[0]});
//     }
//     return (

//       <React.Fragment>
//       <h1 style={{ textAlign: "center" }}>Update User</h1>
//       <form
//         className={classes.root}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//         onSubmit={handleOnSubmit}
//         encType='multipart/form-data'
//       >
//         <TextField
//           name="name"
//           label="Name"
//           value={name || ""}
//           onChange={handleTextChange}
//           fullWidth

//         />
//         <TextField
//           name="email"
//           label="Email"
//           value={email || ""}
//           onChange={handleTextChange}
//           fullWidth
//         />
//         {/* <TextField
//           name="role"
//           label="Role"
//           value={role || ""}
//           onChange={handleTextChange}
//           fullWidth
//         /> */}
//         <div>
//         <input 
//                 type="file" 
//                 name="profileImg"
//                 onChange={handlePhoto}
//                 //  value={imgCollection || ""}
//             />
//             {/* <p>{imgCollection || ""}</p> */}
//           </div>
//         <Button
         
//           type="submit"
//           variant="contained"
//           color="primary"
//           onChange={handleTextChange}
         
//         >
//           Submit
//         </Button>
//         <Button href="/dashboard">
//         Back
//       </Button>
//           {/* <CircularProgress size={24} className={classes.buttonProgress} /> */}
        
//       </form>
//     </React.Fragment>
      
//     );
// }



// export default editUser


import React, { useState } from "react";
import { connect } from "react-redux";
import { updateUserAction } from "../actions/creators";
// import { pushNotification } from "utils/notifications";
import {  useHistory } from "react-router-dom";
// import profileImg from "assets/images/user.svg";

function editUser(props) {
  const { user, updateUserAction } = props;
  const { name, email, profileImg, id } = user.user;
  const history = useHistory();
  const hiddenFileInput = React.useRef(null);

  const [previewSource, setPreviewSource] = useState(profileImg);
  const [saveChanges, setSaveChanges] = useState(false);
  const [data, setData] = useState({
    email: email,
    name: name,
    // role: role,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
      setData((pre) => ({
        ...pre,
        profileImg: reader.result,
      }));
    };
    setSaveChanges(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "profileImg") {
      const file = e.target.files[0];
      previewFile(file);
    } else {
      setData((pre) => ({
        ...pre,
        [name]: value,
      }));
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = () => {
    updateUserAction(id, data);
  };

  return (
    <div className="container">
      <div className="row mt-5 mx-auto">
        <div className="col-4 py-5 d-flex justify-content-center bg-light m-3">
          <div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary rounded-circle"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </button>
              <input
                type="file"
                name="profile"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
            <div
              className="border border-dark rounded-circle my-2 d-flex justify-content-center align-items-center"
              style={{ width: "200px", height: "200px" }}
            >
              {previewSource ? (
                <img
                  src={previewSource}
                  width="200"
                  height="200"
                  className="rounded-circle"
                  alt=""
                />
              ) : (
                "No profile found"
              )}
            </div>
            <h5 className="text-center py-3">{user.user.name}</h5>
          </div>
        </div>
        <div className="col-7 bg-light p-5 m-3">
          <form>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={data.name}
                  name="name"
                  onChange={handleChange}
                  disabled={!saveChanges}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  disabled={!saveChanges}
                />
              </div>
            </div>

            {/* <div className="form-group row">
              <label className="col-sm-2 col-form-label">Role</label>
              <div className="col-sm-10">
                <select
                  className="form-control-plaintext"
                  name="role"
                  onChange={handleChange}
                  value={userData.role}
                  disabled={!saveChanges}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div> */}

            <div className="row mt-5">
              {saveChanges ? (
                <>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block mb-4"
                      onClick={() => setSaveChanges(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-4"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block mb-4"
                      onClick={handleCancel}
                    >
                      Go back
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-4"
                      onClick={() => setSaveChanges(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function mapState(state) {
  const {  auth } = state;
  const { user } = auth;
  return { user };
}

const actionCreators = {
  updateUserAction: updateUserAction.updateUserAction,
};

export default connect(mapState, actionCreators)(editUser);

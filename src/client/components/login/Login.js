import React, { useState, useEffect,useCallback } from "react";
import { connect } from "react-redux";
import {useNavigate} from "react-router-dom";
import { fetchLoginDetails } from "./../../redux/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./login.scss";
// import "./../registration/PlayerRegistration/PlayerRegistration.scss"

function Login(props) {
const [inputs,setInputs] = useState({});
const {fetchLoginDetails,onAuth } = props;
const navigate = useNavigate()

  const onChangeHandler = useCallback(
    ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
  );

  const onSumbit =()=>{
    const outObj = {...inputs,role:"player"}
    fetchLoginDetails(outObj);
    onAuth(true);
    navigate("/landingpage")

  }


  return (
    <div>
      <p>Login Page</p>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="fieldbox"
      >
        <div className="fieldwrapper">
          <TextField fullWidth id="outlined-basic" label="email" variant="outlined" key="email" name="email" onChange ={onChangeHandler} value={inputs.email}/>
        </div>
       <div className="fieldwrapper">
          <TextField fullWidth type="password" id="outlined-basic" label="password" variant="outlined" key="password" name="password" onChange ={onChangeHandler} value={inputs.password}/>
        </div>
        <div className="fieldwrapper">
          <Button fullWidth variant="contained" color="secondary" onClick={onSumbit}>Submit </Button>
        </div>
      </Box>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoginDetails: (outObj) => dispatch(fetchLoginDetails(outObj)),
  };
};

// const mapStateToProps = (state) => {
//     console.log("82")
//     console.log(state);
//   return state;
// };

export default connect(null, mapDispatchToProps)(Login);

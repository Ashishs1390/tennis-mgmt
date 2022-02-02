import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { fetchDetails } from "./../../../redux/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./PlayerRegistation.scss"

function PlayerRegistration(props) {
    const {data:{data,error},fetchDetails} = props;
    const [inputs,setInputs] = useState({});
  
    let bool = false;
    // const [bool,setBool] = useState((error.status == 200) ? true : false);

    const onChangeHandler = useCallback(
        ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
    );

    if(error.status !==200){
        bool = true;
    }
   
   

    const onSubmit = () =>{
        const outObj = {...inputs,role:"player"}
        fetchDetails(outObj);
    }
    try{
  return (
    <div className="registationform">
      <p>Registration Page <b>{bool}</b></p>

      <Box className = "fieldbox"
        component="form"
        noValidate
        autoComplete="off"
      >
          <div className="fieldwrapper">
            <TextField fullWidth id="outlined-basic" label="first_name" variant="outlined" key="first_name" name="first_name" onChange={onChangeHandler} value={inputs.first_name}/>
          </div>
          <div className="fieldwrapper">
            <TextField fullWidth id="outlined-basic" label="last_name" variant="outlined" key="last_name" name="last_name" onChange={onChangeHandler} value={inputs.last_name}/>

          </div>
          <div className="fieldwrapper">
            <TextField fullWidth id="outlined-basic" label="email" variant="outlined" key="email" name="email" onChange={onChangeHandler} value={inputs.email}/>

          </div>
          <div className="fieldwrapper">
            <TextField fullWidth type="password" id="outlined-basic" label="password" variant="outlined" key="password" name="password" onChange={onChangeHandler} value={inputs.password}/>

          </div>
          <div className="fieldwrapper">
            <Button fullWidth variant="contained" color="secondary" onClick={onSubmit}>Submit </Button>
          </div>
            {bool && <div>{error.msg}</div>}

      </Box>
    </div>
  );
    } catch(error){
        console.log(error)
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: (outObj) => dispatch(fetchDetails(outObj)),
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRegistration);

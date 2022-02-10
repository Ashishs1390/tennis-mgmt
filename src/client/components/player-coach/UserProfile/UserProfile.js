import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { emailValidation,fetchDetails } from "./../../../redux/index";
import {put} from "./../../../api/axios.api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./userprofile.scss";
import TextField from '@mui/material/TextField';
import { useParams } from "react-router-dom";
import updateValue from "../../common/input/updateValue";
import Input from "../../common/input/input.control";
import {useNavigate,Link} from "react-router-dom";

import checkValidity from "../../common/input/validations";
import Cookies from 'js-cookie';





function UserProfile(props){
    const {
      getData,
      emailValidation,
      fetchDetails
    } = props;
    const formElementsArray = []; 
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
      registrationForm: {
        first_name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "First Name",
          },
          value: "",
          validations: [{
            name: 'required',
            value: true,
            errorMessage: 'Please enter first name'
          },{
              name: 'minLength',
              value: 3,
              errorMessage: 'Minimum 3 letters are required'
          },{
              name: 'maxLength',
              value: 20,
              errorMessage: 'Maximum 20 letters are accepted'
          }],
          errorMessageFor: '',
          isValid: false,
          touched: false,
          isValidationProgress: false,
        },
        last_name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Last Name",
          },
          value: "",
          validations: [{
              name: 'required',
              value: false,
              errorMessage: 'Please enter last name'
          },{
              name: 'minLength',
              value: 3,
              errorMessage: 'Minimum 3 letters are required'
          },{
              name: 'maxLength',
              value: 20,
              errorMessage: 'Maximum 20 letters are accepted'
          }],
          errorMessageFor: '',
          isValid: false,
          touched: false,
          isValidationProgress: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Email ID",
          },
          value: "",
          validations: [{
              name: 'required',
              value: true,
              errorMessage: 'Please enter email id'
          },{
              name: 'email',
              value: true,
              errorMessage: 'Please enter valid email id'
          }],
          errorMessageFor: '',
          isValid: false,
          touched: false,
          isValidationProgress: false,
        }

      }
    });


    const [isdisable,setDisable] = useState(0);
    const [toastMsg,setToastmsg] = useState(0);
    const [updatedData,setupDatedData] = useState({"first_name":"","last_name":"","email":""});

    const [errorMsg,setError] = useState(0);
    let isValid = inputs.registrationForm.fromIsValid;
  
  
    let bool = false;
  
    const params = useParams();
    const { role } = params;
  const updateUserInfo = async (obj) => {
    console.log("------updateUserInfo-------")
        const data = await put('api/tennismgmt/registration/authed/',{...obj}).catch((err)=>{
            console.log(err)
        })
       
        if(data.error){
            setError(1)
        }else{
            Cookies.remove("token");
            setToastmsg(1);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
            
        
    }

    useEffect(()=>{
        fetchDetails();
    },[])

    // let obj = {}
    useEffect(()=>{
      if(getData.data.length != 0){
        const obj = {
          first_name:getData.data.first_name,
          last_name:getData.data.last_name,
          email:getData.data.email
        }
        updateValue(obj, setInputs, inputs, 'registrationForm')
      }
    },[getData])
    // const [bool,setBool] = useState((error.status == 200) ? true : false);
  
    const onChangeHandler = useCallback(({ target: { name, value } }) =>
      setInputs((state) => ({ ...state, [name]: value }), [])
    );
  
    const inputChangeHandler = (event, inputIdentifier) => {
      let obj = {};
      obj[inputIdentifier] = event.target.value;
      setupDatedData(old =>  ({...old,...obj}));
      const updatedRegistrationForm = { ...inputs.registrationForm };
      const updateFormElement = { ...updatedRegistrationForm[inputIdentifier] };
      updateFormElement.value = event.target.value;
      updateFormElement.touched = true;
      const errors = checkValidity(event.target.value, updateFormElement.validations, {...inputs.registrationForm});
      updateFormElement.isValid = errors.isValid;
      updateFormElement.errorMessageFor = errors.errorMessageFor;
      updatedRegistrationForm[inputIdentifier] = updateFormElement;
  
      let formIsValidVal = 1;
      for (let inputIdentifier in updatedRegistrationForm) {
          formIsValidVal = updatedRegistrationForm[inputIdentifier].isValid && formIsValidVal;     
      }
  
      setDisable(formIsValidVal)
      setInputs({ registrationForm: updatedRegistrationForm, formIsValid: formIsValidVal });
      formElementsArray[updatedRegistrationForm]
    }
  
  
  
    if (getData.error.status !== 200) {
      bool = true;
    }
  
  
    const onSubmit = () => {
      let putObj = {}
      if (isdisable) {
        //   const registrationData = Object.entries(inputs.registrationForm).reduce((a,b)=>(Object.assign(a,{[b[0]]:b[1].value}),a), {})
        //   const outObj = { ...registrationData, role: role };
       
      }
      for(let data in updatedData){
        if(updatedData[data] !== ''){
          putObj[data] = updatedData[data]
        }
      }
      updateUserInfo(putObj)

    };
    
  
    const emailValidate = () => {
      emailValidation({email: 'abcd@gmail.com'});
    }
  
    try {
  
      for (let key in inputs.registrationForm) {
        formElementsArray.push({
          id: key,
          config: inputs.registrationForm[key]
        });
      }
     
      return (
          <div className="registrationWrapper">

          
        <div className="registationform">
          <p>
            Registration Page <b>{bool}</b>
          </p>
          <Box
            className="fieldbox"
            component="form"
            noValidate
            autoComplete="off"
          >
            {formElementsArray.map((element) => {
              // element.config.value = getData.data[element.id];
              element.config.elementConfig = {
                defaultValue: getData.data[element.id],
              };
              return (
                element.config.elementType && (
                  <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={{ ...element.config.elementConfig }}
                    value={element.config.value}
                    changed={(event) =>
                      inputChangeHandler(event, element.id, element)
                    }
                    isValid={element.config.isValid}
                    errorMessageFor={element.config.errorMessageFor}
                    touched={element.config.touched}
                    shouldValidate={element.config.validations}
                  />
                )
              );
            })}

            <TextField id="outlined" label="Required" value="Hello World" />
            <div className="fieldwrapper">
              {/* <Button disabled={inputs.registrationForm.fromIsValid} fullWidth variant="contained" color="secondary" onClick={onSubmit}>Submit </Button> */}
              <Button
                className={1 ? "unabled" : "unabled"}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
        {
            toastMsg && 
            <div className="toastMsg">
                <p>Need to login again..!!!</p>
            </div>
        }
        {
            errorMsg && 
            <div className="errorMsg">
            <p>User exsist</p>
        </div>

        }
        </div>
      );
    } catch (error) {
      console.log(error);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      emailValidation: (outObj) => dispatch(emailValidation(outObj)),
      fetchDetails:() => dispatch(fetchDetails())
    };
  };
  
  const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

// export default UserProfile;
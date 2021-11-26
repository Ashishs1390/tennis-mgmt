import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { emailValidation,fetchDetails } from "./../../redux/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./userprofile.scss";
import TextField from '@mui/material/TextField';
import { useParams } from "react-router-dom";
// import Input from "../../input/input.control";
import Input from "../input/input.control";

import checkValidity from "../input/validations";

function UserProfile(props){
    console.log(props);
    const {
      data: { data, error },
      getData,
      emailValidation,
      fetchDetails
    } = props;
    const formElementsArray = []; 

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
    const [isdisable,setDisable] = useState(0)
    let isValid = inputs.registrationForm.fromIsValid;
  
    console.log("----------inputs--------------")
    console.log(inputs.registrationForm.formIsValid);
  
    console.log(error.status);
    console.log(error.status == 200);
    let bool = false;
  
    const params = useParams();
    const { role } = params;
    console.log(role);

    useEffect(()=>{
        fetchDetails();
    },[])
    // const [bool,setBool] = useState((error.status == 200) ? true : false);
  
    const onChangeHandler = useCallback(({ target: { name, value } }) =>
      setInputs((state) => ({ ...state, [name]: value }), [])
    );
  
    const inputChangeHandler = (event, inputIdentifier) => {
      console.log(event.target.value
        )
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
  
  
  
    if (error.status !== 200) {
      bool = true;
    }
  
  
  
    console.log(bool);
  
    const onSubmit = () => {
        if(isdisable) {
          const registrationData = Object.entries(inputs.registrationForm).reduce((a,b)=>(Object.assign(a,{[b[0]]:b[1].value}),a), {})
          const outObj = { ...registrationData, role: role };
        //   fetchDetails(outObj);
        }
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
        <div className="registationform">
          <p>
            Registration Page <b>{bool}</b>
          </p>
          <button onClick={emailValidate}>Call API</button>
          <Box
            className="fieldbox"
            component="form"
            noValidate
            autoComplete="off"
          >
          
            {formElementsArray.map(element => {
                console.log("-------element----------")
                console.log(element)
                element.config.value = getData.data[element.id];
                element.config.elementConfig = {defaultValue:getData.data[element.id]}
              return (element.config.elementType && <Input key={element.id}
                elementType={element.config.elementType}
                elementConfig={{...element.config.elementConfig}}
                value={element.config.value}
                changed={(event) => inputChangeHandler(event, element.id,element)}
                isValid={element.config.isValid}
                errorMessageFor={element.config.errorMessageFor}
                touched={element.config.touched}
                shouldValidate={element.config.validations}
              />)
            })}

<TextField
          
          id="outlined"
          label="Required"
          value="Hello World"
        />
           <div className="fieldwrapper">
  
              {/* <Button disabled={inputs.registrationForm.fromIsValid} fullWidth variant="contained" color="secondary" onClick={onSubmit}>Submit </Button> */}
              <Button className={isdisable ? 'unabled':'disabled'} fullWidth variant="contained" color="secondary" onClick={onSubmit}>Submit </Button>
  
            </div>
          </Box>
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
      console.log("p---------");
      console.log(state)
    return state;
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

// export default UserProfile;
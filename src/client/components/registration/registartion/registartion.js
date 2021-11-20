import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { fetchDetails } from "./../../../redux/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./PlayerRegistation.scss";
import { useParams } from "react-router-dom";

const Input = (props) => {
  let inputElement = null;
  let inputClasses = ['fieldwrapper'];
  let errorMessage = '';

  if ((props.isValid && props.shouldValidate.length > 0) || !props.touched) {
    inputClasses = [...inputClasses, 'inputElement'];
  } else {
    inputClasses = [...inputClasses, 'invalid'];
    errorMessage = props.errorMessageFor;
  }

  const errorContainer = () => {
      const message = props.shouldValidate.find(x => x.name === errorMessage)?.errorMessage;
      return (message && <label>{message}</label>)
    };

  switch (props.elementType) {
    case ('input'):
      inputElement = <div className={inputClasses.join(' ')}>
        <TextField
          fullWidth
          id="outlined-basic"
          {...props.elementConfig}
          variant="outlined"
          key="first_name"
          onChange={props.changed}
          value={props.value}
        />
        {errorMessage && errorContainer()}
      </div>
      break;
    default:
    inputElement = <div className={inputClasses.join(' ')}>
        <TextField
          fullWidth
          id="outlined-basic"
          {...props.elementConfig}
          variant="outlined"
          key="first_name"
          onChange={props.changed}
          value={props.value}
        />
        {errorMessage && errorContainer()}
      </div>
      break;
  }

  return inputElement;
}

function PlayerRegistration(props) {
  console.log(props);
  const {
    data: { data, error },
    fetchDetails,
  } = props;
  const [inputs, setInputs] = useState({
    registrationForm: {
      firstName: {
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
        }],
        errorMessageFor: '',
        isValid: false,
        touched: false,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Last Name",
        },
        value: "",
        validations: [{
            name: 'required',
            value: true,
            errorMessage: 'Please enter last name'
        }],
        errorMessageFor: '',
        isValid: false,
        touched: false,
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
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Password",
        },
        value: "",
        validations: [{
            name: 'required',
            value: true,
            errorMessage: 'Please enter password'
        }],
        errorMessageFor: '',
        isValid: false,
        touched: false,
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Confirm Password",
        },
        value: "",
        validations: [{
            name: 'required',
            value: true,
            errorMessage: 'Please enter confirm password'
        },
        {
            name: 'confirm',
            value: 'password',
            errorMessage: 'Entered confirm password is not equal to password'
        }],
        errorMessageFor: '',
        isValid: false,
        touched: false,
      },
      formIsValid: false
    }
  });
  console.log(error.status);
  console.log(error.status == 200);
  let bool = false;

  const params = useParams();
  const { role } = params;
  console.log(role);
  // const [bool,setBool] = useState((error.status == 200) ? true : false);

  const onChangeHandler = useCallback(({ target: { name, value } }) =>
    setInputs((state) => ({ ...state, [name]: value }), [])
  );

  const checkValidity = (value, rules) => {
    let isValid = true;
    let errorMessageFor = '';
    const allControls = {...inputs.registrationForm};
    const setErrorMesage = (valid, error) => {
        if (valid && errorMessageFor === '') {
            errorMessageFor = error;
        }
    }
    for(const rule of rules) {
        switch(rule.name) {
            case 'required': 
                if(rule.value) {
                    isValid = value.trim() !== '' && isValid;
                    setErrorMesage(!isValid, 'required');
                }
            break;
            case 'minLength':
                if(rule.value > 0) {
                    isValid = value.length >= rule.minLength && isValid;
                    setErrorMesage(!isValid, 'minLength');
                }
            break;
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = re.test(String(value.trim()).toLowerCase());
                setErrorMesage(!isValid, 'email');
            break;
            case 'confirm':
                isValid = value.trim() !== '' && value === allControls[rule.value].value && isValid;
                setErrorMesage(!isValid, 'confirm');
            break;
        }
    }

    if(isValid) {
        return {isValid, errorMessageFor: ''};
    } else {
        return {isValid, errorMessageFor};
    }
    
  }

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedRegistrationForm = { ...inputs.registrationForm };
    const updateFormElement = { ...updatedRegistrationForm[inputIdentifier] };
    updateFormElement.value = event.target.value;
    updateFormElement.touched = true;
    const errors = checkValidity(event.target.value, updateFormElement.validations);
    updateFormElement.isValid = errors.isValid;
    updateFormElement.errorMessageFor = errors.errorMessageFor;
    updatedRegistrationForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedRegistrationForm) {
      formIsValid = updatedRegistrationForm[inputIdentifier].isValid && formIsValid;
    }

    setInputs({ registrationForm: updatedRegistrationForm, formIsValid: formIsValid });
  }



  if (error.status !== 200) {
    bool = true;
  }



  console.log(bool);

  const onSubmit = () => {
      if(inputs.registrationForm.fromIsValid) {
        const outObj = { ...inputs, role: "player" };
        fetchDetails(outObj);
      }
  };
  try {

    const formElementsArray = [];
    for (let key in inputs.registrationForm) {
      formElementsArray.push({
        id: key,
        config: inputs.registrationForm[key]
      });
    }
    console.log(formElementsArray);
    return (
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
        
          {formElementsArray.map(element => {
            return (element.config.elementType && <Input key={element.id}
              elementType={element.config.elementType}
              elementConfig={{...element.config.elementConfig}}
              value={element.config.value}
              changed={(event) => inputChangeHandler(event, element.id)}
              isValid={element.config.isValid}
              errorMessageFor={element.config.errorMessageFor}
              touched={element.config.touched}
              shouldValidate={element.config.validations}
            />)
          })}
         <div className="fieldwrapper">
            <Button disabled={inputs.registrationForm.fromIsValid} fullWidth variant="contained" color="secondary" onClick={onSubmit}>Submit </Button>
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
    fetchDetails: (outObj) => dispatch(fetchDetails(outObj)),
  };
};

const mapStateToProps = (state) => {
  console.log("82");
  console.log(state);
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRegistration);

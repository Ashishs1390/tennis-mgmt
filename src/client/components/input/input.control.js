import TextField from "@mui/material/TextField";
import React from "react";

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

  export default Input;
import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = ['fieldwrapper'];
    let errorMessage = '';
    const [age, setAge] = React.useState('');
  
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
            onChange={props.changed}
            value={props.value}
            onKeyDown={props.onKeyDown}
          />
          {errorMessage && errorContainer()}
        </div>
        break;
      case ('select'):
        inputElement = <div className={inputClasses.join(' ')}>
        {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
        <Select
          value={props.value}
          onChange={props.changed}
          displayEmpty
        >
          <MenuItem value="">
            <em>Current game level</em>
            </MenuItem>
            {
            props.values.map((value)=>{
              return (
                <MenuItem key = {value} value={value}>{props.display ? props.display[value] : value}</MenuItem>
              )
            })
            }
        </Select>
        {/* {errorMessage && errorContainer()} */}
      </div>
        break;
      default:
      inputElement = <div className={inputClasses.join(' ')}>
          <TextField
            fullWidth
            id="outlined-basic"
            {...props.elementConfig}
            variant="outlined"
            onChange={props.changed}
            defaultValue={props.value}
          />
          {errorMessage && errorContainer()}
        </div>
        break;
    }
  
    return inputElement;
  }

  export default Input;
// import React, { useState, useEffect, useCallback } from "react";
// import { connect } from "react-redux";
// import { fetchDetails } from "./../../../redux/index";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import "./PlayerRegistation.scss";
// import { useParams } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(() => ({
//   inputElement: {
//     border: '1px solid #0f0'
//   },
//   invalid: {
//     border: '1px solid #f00'
//   }
// }));

// const input = (props) => {
//   const classes = useStyles();
//   let inputElement = null;
//   let inputClasses = [classes.inputElement];

//   if (props.isValid && props.shouldValidate) {
//     inputClasses = [classes.inputElement];
//   } else {
//     inputClasses.push(classes.invalid)
//   }

//   switch (props.elementType) {
//     case ('input'):
//       // inputElement = <input
//       //       className={ inputClasses.join(' ') }
//       //       {...props.elementConfig} 
//       //       value={props.value}
//       //       onChange={props.changed}
//       //     />;
//       inputElement = <div className="fieldwrapper">
//         <TextField
//           className={inputClasses.join(' ')}
//           fullWidth
//           id="outlined-basic"
//           {...props.elementConfig}
//           variant="outlined"
//           key="first_name"
//           onChange={props.changed}
//           value={props.value}
//         />
//       </div>
//       break;
//     default:
//       inputElement = <div className="fieldwrapper">
//         <TextField
//           className={inputClasses.join(' ')}
//           fullWidth
//           id="outlined-basic"
//           {...props.elementConfig}
//           variant="outlined"
//           key="first_name"
//           onChange={props.changed}
//           value={props.value}
//         />
//       </div>
//       break;
//   }

//   return (
//     { inputElement }
//   );
// }

// export default input;


// function PlayerRegistration(props) {
//   console.log(props);
//   const {
//     data: { data, error },
//     fetchDetails,
//   } = props;
//   const [inputs, setInputs] = useState({
//     registrationForm: {
//       firstName: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           label: "First Name",
//         },
//         value: "",
//         validations: {
//           required: true,
//         },
//         isValid: false,
//         touched: false,
//       },
//       lastName: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           label: "Last Name",
//         },
//         value: "",
//         validations: {
//           required: false,
//         },
//         isValid: false,
//         touched: false,
//       },
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           label: "Email ID",
//         },
//         value: "",
//         validations: {
//           required: true,
//         },
//         isValid: false,
//         touched: false,
//       },
//       password: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           label: "Password",
//         },
//         value: "Baban",
//         validations: {
//           required: true,
//         },
//         isValid: false,
//         touched: false,
//       },
//       confirmPassword: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           label: "Confirm Password",
//         },
//         value: "Baban",
//         validations: {
//           required: true,
//         },
//         isValid: false,
//         touched: false,
//       },
//       formIsValid: false
//     }
//   });
//   console.log(error.status);
//   console.log(error.status == 200);
//   let bool = false;

//   const params = useParams();
//   const { role } = params;
//   console.log(role);
//   // const [bool,setBool] = useState((error.status == 200) ? true : false);

//   const onChangeHandler = useCallback(({ target: { name, value } }) =>
//     setInputs((state) => ({ ...state, [name]: value }), [])
//   );

//   const checkValidity = (value, rule) => {
//     let isValid = true;
//     if (rule?.required) {
//       isValid = value.trim() !== '';
//     }

//     if (rule?.minLength) {
//       isValid = value.length >= rule.minLength && isValid;
//     }

//     return isValid;
//   }

//   const inputChangeHandler = (event, inputIdentifier) => {
//     const updatedRegistrationForm = { ...inputs };
//     const updateFormElement = { ...updatedRegistrationForm[inputIdentifier] };
//     updateFormElement.value = event.target.value;
//     updateFormElement.touched = true;
//     updateFormElement.isValid = checkValidity(event.target.value, updateFormElement.validations);
//     updatedRegistrationForm[inputIdentifier] = updateFormElement;

//     const formIsValid = true;
//     for (let inputIdentifier in updatedRegistrationForm) {
//       formIsValid = updatedRegistrationForm[inputIdentifier].isValid && formIsValid;
//     }

//     setInputs({ registrationForm: updatedRegistrationForm, formIsValid });
//   }



//   if (error.status !== 200) {
//     bool = true;
//   }



//   console.log(bool);

//   const onSubmit = () => {
//     const outObj = { ...inputs, role: "player" };
//     fetchDetails(outObj);
//   };
//   try {

//     const formElementsArray = [];
//     for (let key in inputs) {
//       formElementsArray.push({
//         id: key,
//         config: inputs[key]
//       });
//     }
//     return (
//       <div className="registationform">
//         <p>
//           Registration Page <b>{bool}</b>
//         </p>

//         <form onSubmit={orderHandler}>
//           {formElementsArray.map(element => {
//             return <Input key={element.id}
//               elementType={element.elementType}
//               elementConfig={{...element.config.elementConfig}}
//               value={element.config.value}
//               changed={(event) => this.inputChangeHandler(event, element.id)}
//               isValid={element.config.isValid}
//               touched={element.config.touched}
//               shouldValidate={element.config.validations}
//             />
//           })}

//           <button disabled={this.state.fromIsValid}>Submit</button>
//         </form>

//         <Box
//           className="fieldbox"
//           component="form"
//           noValidate
//           autoComplete="off"
//         >
//           <div className="fieldwrapper">
//             <TextField
//               fullWidth
//               id="outlined-basic"
//               label="first_name"
//               variant="outlined"
//               key="first_name"
//               name="first_name"
//               onChange={onChangeHandler}
//               value={inputs.first_name}
//             />
//           </div>
//           <div className="fieldwrapper">
//             <TextField
//               fullWidth
//               id="outlined-basic"
//               label="last_name"
//               variant="outlined"
//               key="last_name"
//               name="last_name"
//               onChange={onChangeHandler}
//               value={inputs.last_name}
//             />
//           </div>
//           <div className="fieldwrapper">
//             <TextField
//               fullWidth
//               id="outlined-basic"
//               label="email"
//               variant="outlined"
//               key="email"
//               name="email"
//               onChange={onChangeHandler}
//               value={inputs.email}
//             />
//           </div>
//           <div className="fieldwrapper">
//             <TextField
//               fullWidth
//               type="password"
//               id="outlined-basic"
//               label="password"
//               variant="outlined"
//               key="password"
//               name="password"
//               onChange={onChangeHandler}
//               value={inputs.password}
//             />
//           </div>
//           <div className="fieldwrapper">
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               onClick={onSubmit}
//             >
//               Submit{" "}
//             </Button>
//           </div>
//           {bool && <div>{error.msg}</div>}
//         </Box>
//       </div>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchDetails: (outObj) => dispatch(fetchDetails(outObj)),
//   };
// };

// const mapStateToProps = (state) => {
//   console.log("82");
//   console.log(state);
//   return state;
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PlayerRegistration);

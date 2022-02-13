import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { postDetails, emailValidation } from "./../../../../redux/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./PlayerRegistation.scss";
import { useParams } from "react-router-dom";
import Input from "../../../common/input/input.control";
import checkValidity from "../../../common/input/validations";
import { get } from "../../../../api/axios.api";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";


function PlayerRegistration(props) {
  const navigate = useNavigate();
  const {
    registration: { data, error, registration },
    postDetails,
    emailValidation,
  } = props;
  const [inputs, setInputs] = useState({
    registrationForm: {
      first_name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "First Name",
        },
        value: "",
        validations: [
          {
            name: "required",
            value: true,
            errorMessage: "Please enter first name",
          },
          {
            name: "minLength",
            value: 3,
            errorMessage: "Minimum 3 letters are required",
          },
          {
            name: "maxLength",
            value: 20,
            errorMessage: "Maximum 20 letters are accepted",
          },
        ],
        errorMessageFor: "",
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
        validations: [
          {
            name: "required",
            value: false,
            errorMessage: "Please enter last name",
          },
          {
            name: "minLength",
            value: 3,
            errorMessage: "Minimum 3 letters are required",
          },
          {
            name: "maxLength",
            value: 20,
            errorMessage: "Maximum 20 letters are accepted",
          },
        ],
        errorMessageFor: "",
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
        validations: [
          {
            name: "required",
            value: true,
            errorMessage: "Please enter email id",
          },
          {
            name: "email",
            value: true,
            errorMessage: "Please enter valid email id",
          },
        ],
        errorMessageFor: "",
        isValid: false,
        touched: false,
        isValidationProgress: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Password",
        },
        value: "",
        validations: [
          {
            name: "required",
            value: true,
            errorMessage: "Please enter password",
          },
          {
            name: "minLength",
            value: 5,
            errorMessage: "Minimum 3 letters are required",
          },
          {
            name: "maxLength",
            value: 20,
            errorMessage: "Maximum 20 letters are accepted",
          },
        ],
        errorMessageFor: "",
        isValid: false,
        touched: false,
        isValidationProgress: false,
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Confirm Password",
        },
        value: "",
        validations: [
          {
            name: "required",
            value: true,
            errorMessage: "Please enter confirm password",
          },
          {
            name: "confirm",
            value: "password",
            errorMessage: "Entered confirm password is not equal to password",
          },
        ],
        errorMessageFor: "",
        isValid: false,
        touched: false,
        isValidationProgress: false,
      },
    },
  });
  const [isdisable, setDisable] = useState(0);
  let isValid = inputs.registrationForm.fromIsValid;
  const params = useParams();
  const { role } = params;

  useEffect(() => {
    if (role === "player") {
      get("/api/tennismgmt/list/agegrouplist")
        .then((x) => {
          if (x.data.data) {
            // console.log(x.data.data.itn_level)
          }
          setInputs({
            ...inputs,
            registrationForm: {
              ...inputs.registrationForm,
              current_level: {
                ...inputs.registrationForm.current_level,
                values: x.data.data.itn_level,
                display: x.data.data.itn_level_mapping,
                elementType: "select",
                elementConfig: {
                  label: "Current Game Level",
                },
                value: "",
                validations: [
                  {
                    name: "required",
                    value: true,
                    errorMessage: "Please enter the current level",
                  },
                ],
              },
            },
          });
        })
        .catch((err) => {
          console.log("^^^^:^^^^", err);
        });
    }
  }, []);

  useEffect(() => {
    if (data.length > 0 && !registration) {
      navigate(`./../../user/${role}`);
    }
  }, [data]);

  let bool = false;

  const onChangeHandler = useCallback(({ target: { name, value } }) =>
    setInputs((state) => ({ ...state, [name]: value }), [])
  );

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedRegistrationForm = { ...inputs.registrationForm };
    const updateFormElement = { ...updatedRegistrationForm[inputIdentifier] };
    updateFormElement.value = event.target.value;
    updateFormElement.touched = true;
    const errors = checkValidity(
      event.target.value,
      updateFormElement.validations,
      { ...inputs.registrationForm }
    );
    updateFormElement.isValid = errors.isValid;
    updateFormElement.errorMessageFor = errors.errorMessageFor;
    updatedRegistrationForm[inputIdentifier] = updateFormElement;

    let formIsValidVal = 1;
    for (let inputIdentifier in updatedRegistrationForm) {
      formIsValidVal =
        updatedRegistrationForm[inputIdentifier].isValid && formIsValidVal;
    }

    setDisable(formIsValidVal);
    setInputs({
      registrationForm: updatedRegistrationForm,
      formIsValid: formIsValidVal,
    });
  };

  if (error.status !== 200) {
    bool = true;
  }

  const onSubmit = () => {
    if (isdisable) {
      const registrationData = Object.entries(inputs.registrationForm).reduce(
        (a, b) => (Object.assign(a, { [b[0]]: b[1].value }), a),
        {}
      );
      const outObj = { ...registrationData, role: role };
      postDetails(outObj);
      navigate('./../../login')
    }
  };

  const handelEnter = (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      onSubmit();
    }
  };

  try {
    const formElementsArray = [];
    for (let key in inputs.registrationForm) {
      formElementsArray.push({
        id: key,
        config: inputs.registrationForm[key],
      });
    }

    return (
      <div className="registationform">
        <Typography variant="h4" gutterBottom component="div" align="center">
          {role.slice(0, 1).toUpperCase() + role.slice(1, role.length) + " "}
          Registration Page
        </Typography>
        <Box
          className="fieldbox"
          component="form"
          noValidate
          autoComplete="off"
        >
          {formElementsArray.map((element) => {
            return (
              element.config.elementType && (
                <Input
                  key={element.id}
                  elementType={element.config.elementType}
                  elementConfig={{ ...element.config.elementConfig }}
                  value={element.config.value}
                  changed={(event) => inputChangeHandler(event, element.id)}
                  isValid={element.config.isValid}
                  errorMessageFor={element.config.errorMessageFor}
                  touched={element.config.touched}
                  shouldValidate={element.config.validations}
                  values={
                    element.config.hasOwnProperty("values")
                      ? element.config.values
                      : []
                  }
                  display={
                    element.config.hasOwnProperty("display")
                      ? element.config.display
                      : {}
                  }
                  onKeyDown={(e) => handelEnter(e)}
                />
              )
            );
          })}
          <div className="fieldwrapper">
            {/* <Button disabled={inputs.registrationForm.fromIsValid} fullWidth variant="contained" color="secondary" onClick={onSubmit}>Submit </Button> */}
            <Button
              className={isdisable ? "unabled" : "disabled"}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
              Submit{" "}
            </Button>
          </div>
          <Typography
            sx={{ display: "block" }}
            component="p"
            variant="body2"
            color="text.primary"
            align="right"
          >
            <Link to="../login"> Back to Login </Link>
          </Typography>
        </Box>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postDetails: (outObj) => dispatch(postDetails(outObj)),
    emailValidation: (outObj) => dispatch(emailValidation(outObj)),
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRegistration);

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./login.scss";

function Login(props) {
  const [inputs, setInputs] = useState({});
  const [role, setRole] = useState("player");
  const [errmsg, setErrmsg] = useState({});
  const { onAuth } = props;
  const navigate = useNavigate();

  const onChangeHandler = useCallback(({ target: { name, value } }) =>
    setInputs((state) => ({ ...state, [name]: value }), [])
  );
  const loginCall = (fields, role) => {
    axios
      .post(`/api/tennismgmt/login/${role}`, { ...fields })
      .then((response) => {
        onAuth(true);
        localStorage.setItem('current_level', response.data.current_level);
        navigate(`/user/${role}`);
        // handle success
      })
      .catch((error) => {
        console.log("-------error--------");
        console.log(error.response.data);
        setErrmsg({ ...error.response.data });
      });
  };

  useEffect(() => {
    console.log(errmsg);
  }, [errmsg]);

  const onSumbit = () => {
    loginCall(inputs, role);
  };

  const handelEnter = (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      const { email, password } = inputs;
      if ((email && password) && email.trim() !== "" && password.trim() !== "") {
        onSumbit();
      }
    }
  };

  return (
    <div className="loginpage">
      <p>Login Page</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handelEnter(e);
        }}
      >
        <FormControl component="fieldset" className="fieldbox">
          <div className="radiowrapper">
            <FormLabel FormLabel component="legend">
              Select login type
            </FormLabel>
            <RadioGroup row aria-label="role" name="row-radio-buttons-group">
              <FormControlLabel
                checked={role === "player"}
                value="player"
                control={<Radio />}
                onClick={() => setRole("player")}
                label="Player"
              />
              <FormControlLabel
                checked={role === "coach"}
                value="coach"
                control={<Radio />}
                onClick={() => setRole("coach")}
                label="Coach"
              />
            </RadioGroup>
          </div>
        </FormControl>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="fieldbox"
        >
          <div className="fieldwrapper">
            <TextField
              fullWidth
              id="outlined-basic"
              label="email"
              variant="outlined"
              key="email"
              name="email"
              onChange={onChangeHandler}
              value={inputs.email}
              onKeyDown={(e) => handelEnter(e)}
            />
          </div>
          <div className="fieldwrapper">
            <TextField
              fullWidth
              type="password"
              id="outlined-basic"
              label="password"
              variant="outlined"
              key="password"
              name="password"
              onChange={onChangeHandler}
              value={inputs.password}
              onKeyDown={(e) => handelEnter(e)}
            />
          </div>
          <div className="fieldwrapper">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onSumbit}
            >
              Submit{" "}
            </Button>
          </div>
        </Box>
      </form>
      {!(
        errmsg &&
        Object.keys(errmsg).length === 0 &&
        Object.getPrototypeOf(errmsg) === Object.prototype
      ) && (
        <div className="errorDiv">
          <p>{errmsg.message}</p>
        </div>
      )}
      <div className="registrationlinks">
        <nav>
          <p>
            <Link to="../registration/player">Player registration link</Link>
          </p>
          <p>
            <Link to="../registration/coach">Coach registration link</Link>
          </p>
          <p>
            <Link to="../registration/parent">Parent registration link</Link>
          </p>
        </nav>
      </div>
      
    </div>
  );
}

export default Login;

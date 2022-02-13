import React, { useEffect, useState, useRef } from "react";
import Login from "../../global/login/Login";
import { connect } from "react-redux";
import { useNavigate, Link, Outlet } from "react-router-dom";
import {
  getSearchedPlayerByEmail,
  fetchLinkedPlayerList,
  addPlayerToList,
  updateConnectedChildren,
} from "./../../../redux/index";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { get } from "../../../api/axios.api";
import LogoutApp from '../../../services/logout';

import "./link-player.scss";

// function DisablingControl(props) {
//     const disabled = props.disabled;
//     delete props.disabled;
//     return (<>
//      {
//          disabled ? (
//             <Button
//               {...props}
//               disabled={true}
//             >
//               { props.loadingSearchedPlayer ?  <CircularProgress color="inherit" /> : 'Search'}
//             </Button>
//          ) : (
//             <Button
//               {...props}
//             >
//               { props.loadingSearchedPlayer ?  <CircularProgress color="inherit" /> : 'Search'}
//             </Button>
//          )
//      }
//     </>);
// }

function LinkPlayer(props) {
  const [searchEmail, setSearchEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState("");
  const [sentForAdd, setSentForAdd] = useState(false);
  const [validEmail, SetValidEmail] = useState(null);
  const [alreadyAddedEmail, setAlreadyAddedEmail] = useState(false);
  const [role, setRole] = useState("");
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const txtCntrl = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(()=>{
      let localStore = localStorage.getItem("localStore");
      localStore = JSON.parse(localStore);
      setRole(localStore.role);
    }, 100);
    props.fetchLinkedPlayerList();
  }, []);

  useEffect(() => {
    if (props.searchedPlayer === "" && sentForAdd) {
      setSentForAdd(false);
      setTimeout(() => {
        setSearchEmail("");
        txtCntrl.current.childNodes[1].children[0].value = "";
        SetValidEmail(null);
      }, 10);
    }
  }, [props.searchedPlayer]);

  const logout = async () => {
    const logoutApp = new LogoutApp(navigate);
    logoutApp.logout();
  }

  const handleToggle = (value) => {
    setEmailChecked(value);
  };

  const validateAndSubmit = (value, submit = true) => {
    const isValid = regEmail.test(value.trim());
    SetValidEmail(isValid);
    if(isValid && props.searchedPlayer === value) {
      addSelectedEmailToList();
      return false;
    }
    const isSearchError = props.errorSearh && props.errorSearh.split(' ')[props.errorSearh.split(' ').length - 1]
    if (isValid && value && value === isSearchError) {
       return false;
    }
    
    const isAlreadyAddedEmail =
      props.searchedPlayerList.indexOf(value.trim()) >= 0;
    value.trim() && setAlreadyAddedEmail(isAlreadyAddedEmail);
    if (isValid && submit && !isAlreadyAddedEmail) {
      props.getSearchedPlayerByEmail(value);
    } else if (value.trim() === "") {
      SetValidEmail(null);
    }
  };

  const addSelectedEmailToList = () => {
    let localStore = localStorage.getItem("localStore");
    localStore = JSON.parse(localStore);
    const reqObj = {
      player_email: props.searchedPlayer,
    };
    reqObj[`${role}_email`] = localStore.email;
    props.addPlayerToList(reqObj);
    setSentForAdd(true);
  };

  const getPlayerItnLevel = () => {
    get('/api/tennismgmt/linktoplayer/itn_level', {params: { email: emailChecked}}).then(x=>{
      updateConnectedChildren(emailChecked);
      localStorage.setItem('child_email', emailChecked);
      localStorage.setItem('current_level', x.data.data.current_level);
      navigate(`../user/${role}`);
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => { }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tennis management
            </Typography>
            <Button color="inherit" onClick={() => { logout() }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Typography variant="h4" gutterBottom component="div" align="center">
        Player Connect
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={2}></Grid>
          <Grid item xs={10} md={4}>
            <Box sx={{ minWidth: 120 }}>
              <TextField
                required
                id="outlined-required"
                label="Player email"
                defaultValue={searchEmail}
                fullWidth={true}
                ref={txtCntrl}
                onChange={(e) => {
                  setSearchEmail(e.target.value);
                }}
                onBlur={(e) => {
                  validateAndSubmit(e.target.value, false);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 || e.key === "Enter") {
                    validateAndSubmit(e.target.value, true);
                  }
                }}
              />
            </Box>
            {validEmail === false && (
              <Typography
                className="alert-email"
                variant="p"
                component="div"
                align="left"
              >
                Please enter valid email id.
              </Typography>
            )}
            {alreadyAddedEmail && (
              <Typography
                className="alert-email"
                variant="p"
                component="div"
                align="left"
              >
                Email id already added in your list.
              </Typography>
            )}
            {
              validEmail && props.errorSearh && (
                <Typography
                className="alert-email"
                variant="p"
                component="div"
                align="left"
              >
                {props.errorSearh}
              </Typography>
              )
            }
          </Grid>
          <Grid item xs={10} md={2}>
            {(searchEmail.trim() === "" || props.errorSearh ||
              props.searchedPlayer !== searchEmail ||
              props.loadingSearchedPlayer) &&
            !props.loadingAddPlayer ? (
              <Button
                variant="contained"
                onClick={() => {
                  validateAndSubmit(searchEmail, true);
                }}
                inputprops={{ disabled: props.loadingSearchedPlayer }}
              >
                {props.loadingSearchedPlayer ? (
                  <>
                    {"Searching..."}
                    <CircularProgress color="inherit" />
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  addSelectedEmailToList();
                }}
              >
                {props.loadingAddPlayer ? (
                  <>
                    {"Adding..."}
                    <CircularProgress color="inherit" />
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={2}></Grid>
          <Grid item xs={10} md={6}>
            {!props.loadingSearchedPlayerList ? (
              <RadioGroup
                aria-label="gender"
                defaultValue="0"
                name="radio-buttons-group"
              >
                <List
                  dense
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Select player for assessment.
                    </ListSubheader>
                  }
                >
                  {props.searchedPlayerList &&
                    [...props.searchedPlayerList].map((value, i) => {
                      const labelId = `checkbox-list-secondary-label-${i}`;
                      return (
                        <ListItem
                          key={value}
                          secondaryAction={
                            <FormControlLabel
                              value={value}
                              onChange={handleToggle.bind(this, value)}
                              inputprops={{ "aria-labelledby": labelId }}
                              control={<Radio />}
                              label=""
                            />
                          }
                          disablePadding
                        >
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar alt={`S`} src={``} />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${value}`} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                </List>
              </RadioGroup>
            ) : (
              <>
                <Typography
                  className="alert-email"
                  variant="p"
                  component="span"
                  align="left"
                >
                  Loading player list...
                </Typography>
                <CircularProgress color="inherit" />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      {!props.loadingSearchedPlayerList &&
      props.searchedPlayerList &&
      props.searchedPlayerList.length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={6}></Grid>
            <Grid item xs={10} md={2}>
              <Button
                variant="contained"
                onClick={(e) => {
                  getPlayerItnLevel()
                }}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        !props.loadingSearchedPlayerList && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={10} md={2}></Grid>
              <Grid item xs={10} md={4}>
                <Typography
                  variant="p"
                  gutterBottom
                  component="div"
                  align="left"
                >
                  No player link added...!
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )
      )}
    </div>
  );
}

// export default LinkPlayer;

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchedPlayerByEmail: (email) =>
      dispatch(getSearchedPlayerByEmail(email)),
    fetchLinkedPlayerList: () => dispatch(fetchLinkedPlayerList()),
    addPlayerToList: (details) => dispatch(addPlayerToList(details)),
    updateConnectedChildren: (email) =>
      dispatch(updateConnectedChildren(email)),
  };
};

const mapStateToProps = (state) => {
  const stateData = state.linkPlayerReducer;
  return {
    loadingSearchedPlayer: stateData.loadingSearchedPlayer,
    searchedPlayerList: stateData.searchedPlayerList,
    errorSearh: stateData.errorSearh,
    searchedPlayer: stateData.searchedPlayer,
    loadingSearchedPlayerList: stateData.loadingSearchedPlayerList,
    loadingAddPlayer: stateData.loadingAddPlayer,
    basicInfo: stateData.getData ? stateData.getData.data : {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkPlayer);

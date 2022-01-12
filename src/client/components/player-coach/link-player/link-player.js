import React, { useEffect, useState } from "react";
import Login from "../../global/login/Login";
import { connect } from "react-redux";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { fetchDetails } from "./../../../redux/index";
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
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from "@mui/material/Avatar";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./link-player.scss";

function LinkPlayer(props) {
  const [checked, setChecked] = useState(0);

  const handleToggle = (value) => () => {
    setChecked(value);
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
              onClick={() => {}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tennis management
            </Typography>
            <Button color="inherit" onClick={() => {}}>
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
                defaultValue=""
                fullWidth="true"
              />
            </Box>
          </Grid>
          <Grid item xs={10} md={2}>
            <Button
              variant="contained"
              onClick={() => {
                console.log(props);
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={2}></Grid>
          <Grid item xs={10} md={6}>
            <RadioGroup
              aria-label="gender"
              defaultValue="0"
              name="radio-buttons-group"
            >
            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Select player for assessment
                </ListSubheader>
              }
            >
              {['poo.baa@gmail.com', 'goo.uaa@gmail.com', 'voo.haa@gmail.com', 'koo.jaa@gmail.com'].map((value, i) => {
                const labelId = `checkbox-list-secondary-label-${i}`;
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <FormControlLabel value={value} onChange={handleToggle(value)} inputProps={{ "aria-labelledby": labelId }} control={<Radio />} label="" />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`S`}
                          src={``}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={`${value}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={6}></Grid>
          <Grid item xs={10} md={2}>
          <Button
              variant="contained"
              onClick={() => {
                console.log(props);
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid> 
      </Box>
    </div>
  );
}

export default LinkPlayer;

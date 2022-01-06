import React, { useEffect, useState } from "react";
import Login from "../../global/login/Login";
import { connect } from "react-redux";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { fetchDetails } from "./../../../redux/index";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function LandingPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    props.fetchDetails();
  }, []);

  const [menuOpen, setMenuOpen] = useState(true);

  const handleDrawerClick = () => {
    if (menuOpen == false) setMenuOpen(true);
    else setMenuOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(open);
  };

  const updateNav = (link) => {
    navigate(link);
    setMenuOpen(false);
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
              onClick={handleDrawerClick.bind()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tennis management
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={menuOpen} onClose={toggleDrawer(false)}>
        <MenuItem
          onClick={() => {
            updateNav('./profilepage');
          }}
        >
         Profile Page
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateNav('./video/analysis');
          }}
        >
          Video Page
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateNav('./strockanalysislist');
          }}
        >
          Strock Analysis List Page
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateNav('./comparelibrary');
          }}
        >
          Compare Library
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateNav('./assessments');
          }}
        >
         Assessments
        </MenuItem>
      </Drawer>
      <Outlet></Outlet>
    </div>
  );
}
const mapStateToProps = (state) => {

  return {
    userInfo: state.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: () =>
      dispatch(fetchDetails({ type: "FETCH_BASICINFO_REQUEST" })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

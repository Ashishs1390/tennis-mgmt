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
import LogoutApp from "../../../services/logout";
import HeaderDetails from "../header-deatils/header-detail";

import './landingpage.scss';

function LandingPage(props) {
  const { userInfo } = props;
  const localStore = localStorage.getItem("localStore");
  const child_email = localStorage.getItem("child_email")
  const [role, setRole] = useState("");
  const [childEmail, setEmail] = useState("");
  useEffect(() => {
    const role = JSON.parse(localStore).role;
    setRole(role);
  }, [localStore]);
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(child_email);

  }, [child_email]);
  useEffect(() => {
    if (role == "parent" || role == "coach") {
      props.fetchDetails(childEmail);
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem("childInfo", JSON.stringify(userInfo.data));
  }, [userInfo]);

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

  const logout = async () => {
    const logoutApp = new LogoutApp(navigate);
    logoutApp.logout();
  }

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
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <HeaderDetails />
      </Box>
      <Drawer sm={{top: '60px !important'}} open={menuOpen} onClose={toggleDrawer(false)}>
        <MenuItem
          onClick={() => {
            updateNav('./profilepage');
          }}
        >
          Profile Page
        </MenuItem>
        {role === "player" && (<>
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
        </>)
        } <MenuItem
          onClick={() => {
            updateNav('./assessments');
          }}
        >
          Assessments
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateNav('./playerdevelopment');
          }}
          >
          Player Development
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
    fetchDetails: (email) =>
      dispatch(fetchDetails(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

import React,  { useEffect, useState, useRef }  from 'react';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useNavigate, Link, Outlet } from "react-router-dom";
import LogoutApp from "../../../services/logout";
const localStore = localStorage.getItem("localStore");

function NavBarParent() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
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
    };
    useEffect(() => {
        const { first_name, last_name } = JSON.parse(localStore);
        const fullName = `${first_name} ${last_name}`;
        setUserName(fullName);
    }, [localStore]);

    const logout = async () => {
        const logoutApp = new LogoutApp(navigate);
        logoutApp.logout();
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
                        <Typography>
                            <p className="nav_title">
                                {userName}
                            </p>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </Button>
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer sm={{ top: '60px !important' }} open={menuOpen} onClose={toggleDrawer(false)}>
                <MenuItem
                    onClick={() => {
                        updateNav('./profilepage');
                    }}
                >
                    Profile Page
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        updateNav('../competancyaggregation');
                    }}
                >
                    Player Data
                </MenuItem>
            </Drawer>
        </div>
    )
}

export default NavBarParent;
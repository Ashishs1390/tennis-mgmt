import React, { useState, useEffect, useCallback }  from 'react';
import { getCompetancyDetails, updateConnectedChildren } from "./../../../redux/index";
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NavBarParent from "../../player-coach/NavBarParent/NarBarParent";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CompetancyAggrGraph from './CompetancyAggrGraph';
import { get } from "../../../api/axios.api";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";

function CompetancyAggregation(props) {
    const navigate = useNavigate();
    const { getCompetancyDetails, aggregatedCompData: { aggrData }, selectedPlayers } = props;
    const [data, setData] = useState([]);
    const [role, setRole] = useState("");
    // const [player,setPlayers] = useState([]);

    useEffect(() => {
        getCompetancyDetails(selectedPlayers)
    }, []);
    useEffect(() => {
        setData(aggrData);
    }, [aggrData]);
    useEffect(() => {
            let localStore = localStorage.getItem("localStore");
            localStore = JSON.parse(localStore);
            setRole(localStore.role);
    }, []);


    const routePlayerDevelop = (selectedEmail,current_level) => {
        get("/api/tennismgmt/linktoplayer/itn_level", {
            params: { email: selectedEmail},
        })
            .then((x) => {
                updateConnectedChildren(selectedEmail);
                localStorage.setItem("child_email", selectedEmail);
                localStorage.setItem("current_level", x.data.data.current_level);
                navigate(`../user/${role}/playerdevelopment`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    
    return (
        <div>
            <NavBarParent />
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        width: 428,
                        height: 428,
                    },
                }}
            >

                {
                    data.map((d, index) => {
                        
                        return (
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Button onClick={() => routePlayerDevelop(d.email, d.current_level)}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="h5">
                                        {d.email}
                                        </Typography>
                                    </Button>
                                    <div>
                                        <CompetancyAggrGraph data={ d.data}></CompetancyAggrGraph>
                                    </div>
                                    
                                </CardContent>
                               
                            </Card>
                    )
                })
            }
            </Box>
            <Outlet></Outlet>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        aggregatedCompData: state.aggregatedCompData,
        basicInfo: state.getData ? state.getData.data : {},
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCompetancyDetails: (selectedPlayers) => dispatch(getCompetancyDetails(selectedPlayers)),
        updateConnectedChildren: (email) =>
            dispatch(updateConnectedChildren(email)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyAggregation);


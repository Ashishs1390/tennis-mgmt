import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "./PlayerDevelopment.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
// import DatesPopUp from './../../css-components/DatesPopUp/DatesPopUp';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Modal from "@mui/material/Modal";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

// import DatesPopUp from "../../css-components/DatesPopUp/DatesPopUp";
import { getDateDDMMYYYY } from "../../util/util";

import {
  getPersonalDevPageInfo,
  getPersonalDevOnDate,
} from "./../../redux/index";
import { connect } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PlayerDevelopmentDatesSection(props) {
  const { datesArr } = props;
  const [selectedRadios, setSelectedRadios] = useState({
    player: "",
    parent: "",
    coach: "",
  });
  const [dateShow, setDateShow] = useState({
    player: [],
    parent: [],
    coach: [],
  });
  const [open, setOpen] = useState(false);

  const handleMoreOpen = (bool) => setOpen(bool);
  const handleMoreClose = () => setOpen(false);

  useEffect(() => {
    const getValue = (val) => {
      return val && val.length >= 0 ? val[0] : [];
    };

    const getValues = (val) => {
      return val && val.length >= 0 ? val.slice(0.2) : [];
    };

    if (
      selectedRadios.player === "" &&
      !(
        datesArr &&
        Object.keys(datesArr).length === 0 &&
        Object.getPrototypeOf(datesArr) === Object.prototype
      )
    ) {
      setSelectedRadios({
        player: getValue(datesArr?.player),
        parent: getValue(datesArr?.parent),
        coach: getValue(datesArr?.coach),
      });
      setDateShow({
        player: getValues(datesArr?.player),
        parent: getValues(datesArr?.parent),
        coach: getValues(datesArr?.coach),
      });
    }
  });

  const updateRadioSelections = (value, object, isPopup = true) => {
    const selectedDates = { ...selectedRadios, [object]: value };
    props.getPersonalDevOnDate(selectedDates);
    setSelectedRadios(selectedDates);
    if (isPopup) {
        setDateShow({ ...dateShow, [object]: [value] });
    }
  };
  return (
    <>
      <Grid container spacing={2} className="ModalContent">
        {Object.keys(datesArr).map((x) => {
          return (
            <Grid className="DatesRole" key={x} item xs={12} md={2}>
                <Item className="MoreBtn" onClick={handleMoreOpen}>
                  <span>+more</span>
                </Item>
              <Item>
                <Typography variant="h6" component="div">
                  {x[0].toUpperCase() + x.slice(1)}
                </Typography>
                <RadioGroup
                  aria-label={`${x}`}
                  defaultValue="0"
                  name="radio-buttons-group"
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {
                      [...dateShow[x]].slice(0, 2).map((value, i) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton role={undefined} dense>
                              <ListItemIcon>
                                <FormControlLabel
                                  value={value}
                                  onChange={() => {
                                    updateRadioSelections(value, x, false);
                                  }}
                                  inputprops={{ "aria-labelledby": labelId }}
                                  control={<Radio />}
                                  checked={selectedRadios[x] === value}
                                  label={`${getDateDDMMYYYY(value)}`}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </RadioGroup>
              </Item>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        className="Modal DatesModal"
        open={open}
        onClose={handleMoreClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <Grid container spacing={2} className="ModalContent">
            {Object.keys(datesArr).map((x) => {
              return (
                <Grid className="DatesRole" key={x} item xs={12} md={2}>
                  <Item>
                    <Typography variant="h6" component="div">
                      {x[0].toUpperCase() + x.slice(1)}
                    </Typography>
                    <RadioGroup
                      aria-label={`${x}`}
                      defaultValue="0"
                      name="radio-buttons-group"
                    >
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >
                        {[...datesArr[x]].map((value, i) => {
                            const labelId = `checkbox-list-label-${value}`;

                            return (
                              <ListItem key={value} disablePadding>
                                <ListItemButton role={undefined} dense>
                                  <ListItemIcon>
                                    <FormControlLabel
                                      value={value}
                                      onChange={() => {
                                        updateRadioSelections(value, x);
                                      }}
                                      inputprops={{
                                        "aria-labelledby": labelId,
                                      }}
                                      control={<Radio />}
                                      checked={selectedRadios[x] === value}
                                      label={`${getDateDDMMYYYY(value)}`}
                                    />
                                  </ListItemIcon>
                                </ListItemButton>
                              </ListItem>
                            );
                          })}
                      </List>
                    </RadioGroup>
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalDevPageInfo: (current_level) =>
      dispatch(getPersonalDevPageInfo(current_level)),
    getPersonalDevOnDate: (data) => dispatch(getPersonalDevOnDate(data)),
  };
};

const mapStateToProps = (state) => {
  return { pdpData: state.personalDevelopment.pdpData };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerDevelopmentDatesSection);

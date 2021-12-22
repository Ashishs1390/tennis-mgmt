import * as React from "react";
import { useEffect } from "react";
import Competancy from "./competancy";
import {getCompetancy} from "./../../redux/index"
import { connect } from "react-redux";
function CompetancyRating(props) {
    const {getCompetancy} = props
    useEffect(()=>{
        getCompetancy()
    },[]);
    return (
        <Competancy />
    );
}

// export default CompetancyRating;

const mapDispatchToProps = (dispatch) => {
    return {
        getCompetancy:() =>dispatch(getCompetancy())
    };
  };
  
  const mapStateToProps = (state) => {
    console.log(state);
    // const {videoCompare} = state;

    // return {videoAnalysis: state.videoAnalysis,
    //         videoCompare
    // };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);
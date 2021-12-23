import * as React from "react";
import { useEffect } from "react";
import ItnComprtancy from "./itn_competancy";
import {getCompetancy} from "./../../redux/index"
import { connect } from "react-redux";
function CompetancyRating(props) {
    const {getCompetancy} = props
    useEffect(()=>{
        getCompetancy()
    },[]);
    return (
        [1, 2, 3].map((x) => (
            <ItnComprtancy />
          ))
        
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
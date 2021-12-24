import * as React from "react";
import { useEffect, useState } from "react";
import BundelCompetancy from "./bundel_competancy";
import {getCompetancy} from "./../../redux/index"
import { connect } from "react-redux";
function CompetancyRating(props) {
    const {getCompetancy} = props
  const [competancyData, SetCompetancyData] = useState([]);

    useEffect(()=>{
        console.log();
        getCompetancy()
    },[]);
    useEffect(()=>{
        console.log('--->', props.competancyData);
        SetCompetancyData(props.competancyData);
    },[props.competancyData]);
    return (
        (props.competancyData && props.competancyData.length > 0) ? [...props.competancyData].map((x) => (
            <BundelCompetancy {...x} key={x.competency_bundle}/>
          )) : <p> No data available</p>
        
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
    return {competancyData: state.competancy.competancyData};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);
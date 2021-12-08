import React,{useEffect} from 'react';
import Login from './../login/Login';
import { connect } from "react-redux";
import {useNavigate,Link} from "react-router-dom";
import {fetchDetails } from "./../../redux/index";



function LandingPage(props){



  useEffect(()=>{
    props.fetchDetails();
  },[])

    return(
        <div>
           <p>Landing page</p> 
           <nav>
          <p>
            <Link to="./../profilepage">Profile Page</Link>

          </p>
          <p>
            <Link to="./../video/analysis">Video Page</Link>
            
          </p>
          <p>
            <Link to="./../strockanalysislist">Strock Analysis List Page</Link>
            
          </p>
          <p>
            <Link to="./../comparelibrary">Strock Analysis List Page</Link>
            
          </p>
        </nav>
           
        </div>
    )

}
const mapStateToProps = (state) => {
  console.log(state)
return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails:() => dispatch(fetchDetails({type:"FETCH_BASICINFO_REQUEST"}))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
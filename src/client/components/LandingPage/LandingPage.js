import React from 'react';
import Login from './../login/Login';
import {useNavigate,Link} from "react-router-dom";


function LandingPage(props){
    return(
        <div>
           <p>Landing page</p> 
           <nav>
          <p>
            <Link to="./../profilepage">Profile Page</Link>
          </p>
        </nav>
           
        </div>
    )

}

export default LandingPage;
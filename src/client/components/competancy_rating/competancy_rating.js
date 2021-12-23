import * as React from "react";
import { useEffect } from "react";
import ItnComprtancy from "./itn_competancy";

function CompetancyRating(props) {
    return (
        [1, 2, 3].map((x) => (
            <ItnComprtancy />
          ))
        
    );
}

export default CompetancyRating;
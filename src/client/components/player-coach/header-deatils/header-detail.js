import React, { useState } from "react";
import './header-details.scss';

const HeaderDetails = () => {
  const [userDetails] = useState(
    JSON.parse(localStorage.getItem("localStore"))
  );
  const [player] = useState(
    localStorage.getItem("child_email")
  );

  return (
    <>
      <div className="header-detals">
        <p>
          <span className="header-role">{userDetails.role[0]?.toUpperCase() + userDetails.role?.slice(1)}</span>:{" "}
          <span>{`${userDetails.first_name} ${userDetails.last_name}`}</span>
        </p>
        {player &&
        <p>
          <span className="header-role">{`Player`}</span>:{" "}
          <span>{`${player}`}</span>
          </p>
        }
      </div>
     
    </>
  );
};

export default HeaderDetails;

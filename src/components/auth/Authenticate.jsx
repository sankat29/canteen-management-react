import React, { useState } from "react";

import Card from "../UI/Card";
import AuthAdmin from "../admin/AuthAdmin";
import CopyRightText from "../UI/CopyRightText";
import AuthEmployee from "../employee/AuthEmployee";

import ChefImage from "../../images/chef.png";
import classes from "./Authenticate.module.css";

function Authenticate(props) {
  const [designation, setDesignation] = useState(null);

  const cardTitle = "Canteeno";

  const onRoleClicked = (role) => {
    setDesignation(role);
    window.localStorage.setItem("ROLE", JSON.stringify(role));
  };

  const onBackClicked = () => {
    setDesignation(null);
  };

  return (
    <React.Fragment>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 col-xs-8 offset-md-3 offset-xs-2 text-center">
            <Card
              useTitleClass={true}
              title={cardTitle}
              background="#293462"
              textColor="#ffffff"
            >
              {!designation && (
                <img
                  src={ChefImage}
                  alt="Chef"
                  className={classes.authenticateChef}
                />
              )}
              <div className="row">
                {!designation && (
                  <h6 className="display-4 text-center mb-4">
                    <small>
                      <b style={{ fontFamily: "Dancing Script" }}>
                        Make Your Choice
                      </b>
                    </small>
                  </h6>
                )}

                <AuthAdmin
                  designation={designation}
                  onRoleClicked={onRoleClicked}
                  onBackClicked={onBackClicked}
                  setAdminLoggedIn={props.setLoginAction}
                  setAdminProfile={props.setLoggedInProfile}
                />
                <AuthEmployee
                  designation={designation}
                  onRoleClicked={onRoleClicked}
                  onBackClicked={onBackClicked}
                  setEmployeeLoggedIn={props.setLoginAction}
                  setEmployeeProfile={props.setLoggedInProfile}
                />
              </div>
              <hr />
              <CopyRightText />
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Authenticate;

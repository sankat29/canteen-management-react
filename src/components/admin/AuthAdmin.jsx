import React, { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Card from "../UI/Card";

import {
  validateUserName,
  validateUserPassword,
} from "../../validation/validators";

function AuthAdmin(props) {
  const userName = JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload
    ?.AdminEmail;
  const [adminUserName, setAdminUserName] = useState(
    userName ? userName : null
  );
  const [adminPassword, setAdminPassword] = useState(null);
  const [adminLoginDisabled, setAdminLoginDisabled] = useState(true);

  const onAdminUserNameInput = (event) => {
    if (
      validateUserName(event.target.value) &&
      (adminPassword !== null || adminPassword === "")
    ) {
      setAdminLoginDisabled(false);
    } else {
      setAdminLoginDisabled(true);
    }
    setAdminUserName(event.target.value);
  };

  const onAdminPasswordInput = (event) => {
    if (validateUserPassword(event.target.value)) {
      setAdminLoginDisabled(false);
    } else {
      setAdminLoginDisabled(true);
    }
    setAdminPassword(event.target.value);
  };

  const onAdminLogin = () => {
    const adminDetails = {
      AdminEmail: adminUserName,
      AdminPassword: adminPassword,
    };
    localStorage.setItem(
      "LOGGED_IN",
      JSON.stringify({
        ROLE: "ADMIN",
        payload: adminDetails,
      })
    );
    props.setAdminLoggedIn(true);
    props.setAdminProfile("ADMIN");
  };

  return (
    <React.Fragment>
      {/* When Designation Is Null */}
      {props.designation === null && (
        <div className="col-6">
          <Card textColor="#000" title="Admin" background="#F2D7D9">
            <Button
              color="danger"
              label="Proceed As Admin"
              width="100%"
              onClick={() => {
                props.onRoleClicked("Admin");
              }}
            />
          </Card>
        </div>
      )}
      {/* When Designation Is Admin */}
      {props.designation === "Admin" && (
        <React.Fragment>
          <div className="display-4 text-center text-warning">
            <small>{"Admin"}</small>
          </div>
          <div className="container mt-4">
            <Card title="Please enter your credentials" textColor="#000">
              <div className="container">
                <div className="row">
                  <div className="col-12 p-1">
                    <Input
                      onKeyUp={onAdminUserNameInput}
                      type="text"
                      placeholder="Enter Admin User Name"
                    />
                  </div>
                  <div className="col-12 p-1 mb-3">
                    <Input
                      onKeyUp={onAdminPasswordInput}
                      type="password"
                      placeholder="Enter Admin Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 p-1">
                    <Button
                      label="Login As Admin"
                      width="100%"
                      color="danger"
                      disabled={adminLoginDisabled}
                      onClick={() => {
                        onAdminLogin();
                      }}
                    />
                  </div>
                  <div className="col-6 p-1">
                    <Button
                      label="Back"
                      width="100%"
                      color="warning"
                      onClick={props.onBackClicked}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AuthAdmin;

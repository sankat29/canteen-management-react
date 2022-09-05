import React, { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Card from "../UI/Card";

import {
  validateUserName,
  validateUserPassword,
} from "../../validation/validators";

function AuthEmployee(props) {
  const [employeeUserName, setEmployeeUserName] = useState(null);
  const [employeePassword, setEmployeePassword] = useState(null);
  const [employeeLoginDisabled, setEmployeeLoginDisabled] = useState(true);

  const onEmployeeUserNameInput = (event) => {
    if (
      validateUserName(event.target.value) &&
      (employeePassword !== null || employeePassword === "")
    ) {
      setEmployeeLoginDisabled(false);
    } else {
      setEmployeeLoginDisabled(true);
    }
    setEmployeeUserName(event.target.value);
  };

  const onEmployeePasswordInput = (event) => {
    if (validateUserPassword(event.target.value)) {
      setEmployeeLoginDisabled(false);
    } else {
      setEmployeeLoginDisabled(true);
    }
    setEmployeePassword(event.target.value);
  };

  const onEmployeeLogin = () => {
    const employeeDetails = {
      AdminEmail: employeeUserName,
      AdminPassword: employeePassword,
    };
    localStorage.setItem(
      "LOGGED_IN",
      JSON.stringify({
        ROLE: "EMPLOYEE",
        payload: employeeDetails,
      })
    );
    props.setEmployeeLoggedIn(true);
    props.setEmployeeProfile("EMPLOYEE");
  };
  return (
    <React.Fragment>
      {/* When Designation Is Null */}
      {props.designation === null && (
        <div className="col-6">
          <Card textColor="#000" title="Employee" background="#F2D7D9">
            <Button
              color="success"
              label="Proceed As Employee"
              width="100%"
              onClick={() => {
                props.onRoleClicked("Employee");
              }}
            />
          </Card>
        </div>
      )}
      {/* When Designation Is Employee */}
      {props.designation === "Employee" && (
        <div className="display-4 text-center">
          <React.Fragment>
            <div className="display-4 text-center text-warning">
              <small>{"Employee"}</small>
            </div>
            <div className="container mt-4">
              <Card title="Please enter your credentials" textColor="#000">
                <div className="container">
                  <div className="row">
                    <div className="col-12 p-1">
                      <Input
                        type="text"
                        placeholder="Enter Employee User Name"
                        onKeyUp={onEmployeeUserNameInput}
                      />
                    </div>
                    <div className="col-12 p-1">
                      <Input
                        type="password"
                        placeholder="Enter Employee Password"
                        onKeyUp={onEmployeePasswordInput}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 p-1">
                      <Button
                        label="Login As Employee"
                        width="100%"
                        color="success"
                        disabled={employeeLoginDisabled}
                        onClick={onEmployeeLogin}
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
        </div>
      )}
    </React.Fragment>
  );
}

export default AuthEmployee;

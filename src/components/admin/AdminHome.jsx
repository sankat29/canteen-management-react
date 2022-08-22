import React, { useState, useEffect, useLayoutEffect } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";

import classes from "./AdminHome.module.css";

import ChefDual from "../../images/chefDual.png";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const AdminHome = (props) => {
  const [width] = useWindowSize();
  const [accountWalletText, setAccountWalletText] = useState(null);
  useEffect(() => {
    setAccountWalletText(
      width < 1401 ? "Account Wallet" : "Fund Account Wallet"
    );
  }, [width]);

  const loggedInAdmin = JSON.parse(localStorage.getItem("LOGGED_IN"))?.payload
    ?.AdminEmail;
  const adminName = loggedInAdmin.split("@")[0];

  const onAdminLogout = () => {
    props.didLoginHappen(false);
    props.setLoggedInProfile(null);
    localStorage.clear();
  };

  const addEmployee = () => {};

  const checkEmployeeList = () => {};

  const searchEmployee = () => {};

  const fundAccountWallet = () => {};

  const traverseDaySpecialItems = () => {};

  const traverseFullMenu = () => {};

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div>
          <Button
            label={"Logout " + adminName.toUpperCase()}
            onClick={onAdminLogout}
            btnClass="btn-outline-danger"
          />
        </div>
      </div>
      <div className="container mt-3 text-center">
        <Card
          title={props.loggedInProfile + " (" + loggedInAdmin + ")"}
          background="#293462"
          textColor="#ffffff"
        >
          <div className="row">
            <div className="col-lg-4">
              <img
                src={ChefDual}
                alt="Chef Img"
                className={classes.portalChefImage}
                style={{ width: "340px" }}
              />
            </div>
            <div className="col-lg-8" id={classes.portalDiv}>
              <fieldset>
                <legend>
                  <label className="display-4">
                    <small style={{ fontFamily: "Dancing Script" }}>
                      Employee Portal
                    </small>
                  </label>
                </legend>
                <div className="row p-3">
                  <div className="col p-2">
                    <Card
                      title="Register Employee"
                      textColor="#293462"
                      background="#E8F9FD"
                    >
                      <Button
                        color="success"
                        label="Proceed"
                        onClick={addEmployee}
                      />
                    </Card>
                  </div>
                  <div className="col p-2">
                    <Card
                      title="Checkout Employees"
                      textColor="#293462"
                      background="#E8F9FD"
                    >
                      <Button
                        color="success"
                        label="Proceed"
                        onClick={checkEmployeeList}
                      />
                    </Card>
                  </div>
                  <div className="col p-2">
                    <Card
                      title="Search Employee"
                      textColor="#293462"
                      background="#E8F9FD"
                    >
                      <Button
                        color="success"
                        label="Proceed"
                        onClick={searchEmployee}
                      />
                    </Card>
                  </div>
                  <div className="col p-2">
                    <Card
                      title={accountWalletText}
                      textColor="#293462"
                      background="#E8F9FD"
                    >
                      <Button
                        color="success"
                        label="Proceed"
                        onClick={fundAccountWallet}
                      />
                    </Card>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <label className="display-4">
                    <small style={{ fontFamily: "Dancing Script" }}>
                      Item Portal
                    </small>
                  </label>
                </legend>
                <div className="row p-3">
                  <div className="col p-2">
                    <Card
                      title="Todays Speciality (Items for the Day)"
                      textColor="#293462"
                      background="#F2EBE9"
                    >
                      <Button
                        color="dark"
                        label="Proceed"
                        onClick={traverseDaySpecialItems}
                      />
                    </Card>
                  </div>
                  <div className="col p-2">
                    <Card
                      title="Our Menu (Best Of Our Offerings)"
                      textColor="#293462"
                      background="#F2EBE9"
                    >
                      <Button
                        color="dark"
                        label="Proceed"
                        onClick={traverseFullMenu}
                      />
                    </Card>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default AdminHome;

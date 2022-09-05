import React, { useState, useEffect, useLayoutEffect } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

import classes from "./AdminEmployee.module.css";

import ChefDual from "../../images/chefDual.png";

import { MENU } from "./menu";

import getCurrentWeekDay from "./getCurrentWeekDay";

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

const EmployeeHome = (props) => {
  const [width] = useWindowSize();
  const [accountWalletText, setAccountWalletText] = useState(null);
  const [changePreview, setChangePreview] = useState(
    JSON.parse(localStorage.getItem("CHANGE_PREV"))
      ? JSON.parse(localStorage.getItem("CHANGE_PREV"))
      : false
  );
  const [feature, setFeature] = useState(
    JSON.parse(localStorage.getItem("FEATURE"))
      ? JSON.parse(localStorage.getItem("FEATURE"))
      : null
  );
  const [employeeList, setEmployeeList] = useState(
    JSON.parse(localStorage.getItem("EMPLOYEES"))
      ? JSON.parse(localStorage.getItem("EMPLOYEES"))
      : []
  );
  // Registeration Form States
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [dob, setDOB] = useState(null);
  const [gender, setGender] = useState("Male");
  const [menu, setMenu] = useState([]);
  const currentWeekDay = getCurrentWeekDay(new Date().getDay());
  const [specialMenu, setSpecialMenu] = useState([]);

  const [filterEmployeeList, setFilterEmployeeList] = useState(employeeList);

  useEffect(() => {
    setFilterEmployeeList(employeeList);
  }, [employeeList]);

  useEffect(() => {
    const specialItems = Math.floor(Math.random() * MENU.length);
    setSpecialMenu(MENU[specialItems]);
    setMenu(MENU);
  }, [menu]);

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

  const fundAccountWallet = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("FUND_ACC");
    localStorage.setItem("FEATURE", JSON.stringify("FUND_ACC"));
  };

  const traverseDaySpecialItems = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("DAY_ITEMS");
    localStorage.setItem("FEATURE", JSON.stringify("DAY_ITEMS"));
  };

  const traverseFullMenu = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("MENU");
    localStorage.setItem("FEATURE", JSON.stringify("MENU"));
  };

  const menuColSize = `${feature !== "MENU" ? "col-lg-8" : "col-lg-12"}`;

  const creditFunds = (empId) => {
    console.log(employeeList);
    const empIndex = employeeList.findIndex((emp) => emp.id === empId);
    employeeList[empIndex] = {
      ...employeeList[empIndex],
      funds: employeeList[empIndex]["funds"] + 1,
    };
    localStorage.setItem("EMPLOYEES", JSON.stringify(employeeList));
    setEmployeeList(JSON.parse(localStorage.getItem("EMPLOYEES")));
  };

  const decrementFunds = (empId) => {
    console.log(employeeList);
    const empIndex = employeeList.findIndex((emp) => emp.id === empId);
    if (employeeList[empIndex].funds === 0) return;
    employeeList[empIndex] = {
      ...employeeList[empIndex],
      funds: employeeList[empIndex]["funds"] - 1,
    };
    localStorage.setItem("EMPLOYEES", JSON.stringify(employeeList));
    setEmployeeList(JSON.parse(localStorage.getItem("EMPLOYEES")));
  };

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
            {feature !== "MENU" && (
              <div className="col-lg-4">
                <img
                  src={ChefDual}
                  alt="Chef Img"
                  className={classes.portalChefImage}
                />
              </div>
            )}

            <div className={menuColSize} id={classes.portalDiv}>
              {!changePreview && (
                <div>
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
              )}
              {changePreview && (
                <div>
                  {feature === "FUND_ACC" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Fund Canteen Account
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title="Fund Employee Canteen A/C"
                            textColor="black"
                          >
                            <div className="row p-2">
                              {employeeList.map((employee) => {
                                return (
                                  <div className="col-4 p-4" key={employee.id}>
                                    <Card
                                      background="#90B77D"
                                      title={employee.fName}
                                      textColor="white"
                                    >
                                      <h4 className="p-2">
                                        <strong>
                                          ${employee.funds.toFixed(2)}
                                        </strong>
                                      </h4>
                                      <div className="row">
                                        <div className="col-6">
                                          <Button
                                            width="100%"
                                            color="success"
                                            label="+"
                                            onClick={() => {
                                              creditFunds(employee.id);
                                            }}
                                          />
                                        </div>
                                        <div className="col-6">
                                          <Button
                                            width="100%"
                                            color="success"
                                            label="-"
                                            onClick={() => {
                                              decrementFunds(employee.id);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                );
                              })}
                              <Button
                                color="danger"
                                label="Navigate Back"
                                onClick={() => {
                                  setChangePreview(false);
                                }}
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {feature === "MENU" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Our Menu
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title="The Best Handpicked Dishes"
                            textColor="black"
                          >
                            <div className="row p-4">
                              {menu.map((dish) => {
                                return (
                                  <div className="col-3 p-2" key={dish.item_id}>
                                    <Card
                                      cardHeight="320px"
                                      title={dish.item_name}
                                    >
                                      <div className="text-justify">
                                        {dish.item_desc}
                                      </div>
                                      <h4 className="text-center mt-2">
                                        <strong>${dish.item_price}</strong>
                                      </h4>
                                      <img
                                        style={{ width: "150px" }}
                                        src={dish.item_image}
                                        alt={dish.item_name}
                                      />
                                    </Card>
                                  </div>
                                );
                              })}
                              <div className="mb-3"></div>
                              <Button
                                color="danger"
                                label="Navigate Back"
                                onClick={() => {
                                  setChangePreview(false);
                                }}
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {feature === "DAY_ITEMS" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Today's Special
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title={currentWeekDay + " PICKED ITEMS"}
                            textColor="black"
                          >
                            <div className="row p-1">
                              <div
                                className="col-6 offset-3 p-2"
                                key={specialMenu.item_id}
                              >
                                <Card
                                  cardHeight="320px"
                                  title={specialMenu.item_name}
                                >
                                  <div className="text-justify">
                                    {specialMenu.item_desc}
                                  </div>
                                  <h4 className="text-center mt-2">
                                    <strong>${specialMenu.item_price}</strong>
                                  </h4>
                                  <img
                                    style={{ width: "200px" }}
                                    src={specialMenu.item_image}
                                    alt={specialMenu.item_name}
                                  />
                                </Card>
                                <div className="mb-3"></div>
                                <Button
                                  color="danger"
                                  width="100%"
                                  label="Navigate Back"
                                  onClick={() => {
                                    setChangePreview(false);
                                  }}
                                />
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default EmployeeHome;

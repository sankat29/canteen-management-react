import React, { useState, useEffect, useLayoutEffect } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

import classes from "./AdminHome.module.css";

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

const AdminHome = (props) => {
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

  const addEmployee = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("ADD_EMPLOYEE");
    localStorage.setItem("FEATURE", JSON.stringify("ADD_EMPLOYEE"));
  };

  const checkEmployeeList = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("VIEW_EMP_LIST");
    localStorage.setItem("FEATURE", JSON.stringify("VIEW_EMP_LIST"));
  };

  const searchEmployee = () => {
    setChangePreview(true);
    localStorage.setItem("CHANGE_PREV", JSON.stringify(true));
    setFeature("SEARCH_EMP");
    localStorage.setItem("FEATURE", JSON.stringify("SEARCH_EMP"));
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

  const onFirstNameInput = (event) => {
    setFName(event.target.value);
  };
  const onLastNameInput = (event) => {
    setLName(event.target.value);
  };
  const onAddressInput = (event) => {
    setAddress(event.target.value);
  };
  const onDOBInput = (event) => {
    setDOB(event.target.value);
  };
  const onEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const onGenderInput = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const confirmAddEmployee = () => {
    const empList = JSON.parse(localStorage.getItem("EMPLOYEES"));
    const oldEmployeeList = empList;
    const newEmployeeList = [];
    const emp = {
      id:
        "EMP" + Math.floor(Math.random() * 99 + Math.random() * 54).toString(),
      fName: fName,
      lName: lName,
      address: address,
      email: email,
      dob: dob,
      gender: gender,
      createdAt: new Date().toLocaleDateString("en-GB"),
      funds: 0.0,
    };
    if (oldEmployeeList?.length > 0) {
      oldEmployeeList.forEach((employee) => {
        newEmployeeList.push(employee);
      });
      newEmployeeList.push(emp);
    } else {
      newEmployeeList.push(emp);
    }

    setEmployeeList(newEmployeeList);
    localStorage.setItem("EMPLOYEES", JSON.stringify(newEmployeeList));
    console.log(newEmployeeList);
    window.alert(`Employee Was Added With ID: ${emp.id}`);
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
              )}
              {changePreview && (
                <div>
                  {feature === "ADD_EMPLOYEE" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Register Employee
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title="Please fill Employee Details"
                            textColor="#000"
                          >
                            <div className="container">
                              <div className="row p-2">
                                <div className="col-6">
                                  <Input
                                    type="text"
                                    placeholder="Please Enter First Name"
                                    onKeyUp={onFirstNameInput}
                                  />
                                </div>
                                <div className="col-6">
                                  <Input
                                    type="text"
                                    placeholder="Please Enter Last Name"
                                    onKeyUp={onLastNameInput}
                                  />
                                </div>
                              </div>
                              <div className="row p-2">
                                <div className="col-6">
                                  <Input
                                    type="text"
                                    placeholder="Please Enter Employee Address"
                                    onKeyUp={onAddressInput}
                                  />
                                </div>
                                <div className="col-6">
                                  <Input
                                    type="text"
                                    placeholder="Please Enter Employee Email"
                                    onKeyUp={onEmailInput}
                                  />
                                </div>
                              </div>
                              <div className="row p-2">
                                <div className="col-6">
                                  <Input
                                    type="date"
                                    placeholder="Please Enter Employee D.O.B"
                                    onKeyUp={onDOBInput}
                                  />
                                </div>
                                <div className="col-6">
                                  <select
                                    className="form-control input-sm"
                                    placeholder="Select Gender"
                                    onChange={onGenderInput}
                                  >
                                    <option disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </select>
                                </div>
                              </div>
                              <div className="row p-2 mt-4">
                                <div className="col-6">
                                  <Button
                                    color="success"
                                    width="100%"
                                    label="Confirm Add Employee"
                                    onClick={confirmAddEmployee}
                                  />
                                </div>
                                <div className="col-6">
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
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {feature === "VIEW_EMP_LIST" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Checkout Employees
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card textColor="#000" title="View Current Employees">
                            <div className="row p-2">
                              {employeeList.map((employee) => {
                                return (
                                  <div className="col-4 p-2" key={employee.id}>
                                    <Card
                                      background="#5B4B8A"
                                      textColor="#ffffff"
                                      title={
                                        employee.fName + " " + employee.lName
                                      }
                                    >
                                      <ul
                                        style={{
                                          textAlign: "left",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        <li>{employee.address}</li>
                                        <li>{employee.dob}</li>
                                        <li>{employee.email}</li>
                                        <li>{employee.gender}</li>
                                        <li>${employee.funds.toFixed(2)}</li>
                                      </ul>
                                      <button
                                        className="btn btn-light mx-1"
                                        onClick={() => {
                                          window.alert();
                                        }}
                                      >
                                        Delete
                                      </button>
                                      <button
                                        className="btn btn-info"
                                        onClick={() => {
                                          window.alert(employee.id);
                                        }}
                                      >
                                        Modify
                                      </button>
                                    </Card>
                                  </div>
                                );
                              })}
                            </div>
                            <div style={{ float: "right", padding: "5px" }}>
                              <Button
                                label="Delete All"
                                disabled={
                                  localStorage.getItem("EMPLOYEES")
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  localStorage.removeItem("EMPLOYEES");
                                  setEmployeeList([]);
                                }}
                                btnClass="m-2"
                              />
                              <Button
                                color="danger"
                                label="Navigate Back"
                                onClick={() => {
                                  setChangePreview(false);
                                  localStorage.setItem(
                                    "CHANGE_PREV",
                                    JSON.stringify(false)
                                  );
                                }}
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </fieldset>
                  )}
                  {feature === "SEARCH_EMP" && (
                    <fieldset>
                      <legend>
                        <label className="display-4">
                          <small style={{ fontFamily: "Dancing Script" }}>
                            Search Employee
                          </small>
                        </label>
                      </legend>
                      <div className="row p-3">
                        <div className="col-12">
                          <Card
                            title="Start Typing Employee Name"
                            textColor="black"
                          >
                            <div className="row p-2">
                              <div className="col-12 mb-3">
                                <Input
                                  type="text"
                                  placeholder="Enter the employee name to filter the list"
                                  onKeyUp={(e) => {
                                    if (e.target.value) {
                                      setFilterEmployeeList(
                                        filterEmployeeList.filter((employee) =>
                                          employee.fName
                                            .toString()
                                            .toLowerCase()
                                            .includes(
                                              e.target.value
                                                .toString()
                                                .toLowerCase()
                                            )
                                        )
                                      );
                                    } else {
                                      setFilterEmployeeList(employeeList);
                                    }
                                  }}
                                />
                              </div>
                              <div className="col-12">
                                <ol
                                  style={{
                                    textAlign: "left",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {filterEmployeeList.length > 0 &&
                                    filterEmployeeList.map((emp) => (
                                      <li>
                                        {emp.fName +
                                          " " +
                                          emp.lName +
                                          " with ID: " +
                                          emp.id}{" "}
                                        was created at {emp.createdAt}
                                      </li>
                                    ))}

                                  {filterEmployeeList.length === 0 && (
                                    <div className="p-5 text-center">
                                      <b className="text-danger">
                                        No Employees Available : Consider
                                        Creating One !!
                                      </b>
                                    </div>
                                  )}
                                </ol>
                              </div>
                              <div className="col-6">
                                <Button
                                  color="success"
                                  width="100%"
                                  label="Search"
                                />
                              </div>
                              <div className="col-6">
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

export default AdminHome;

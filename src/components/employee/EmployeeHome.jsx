import React from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";

const EmployeeHome = (props) => {
  const onEmpLogout = () => {
    props.didLoginHappen(false);
    props.setLoggedInProfile(null);
    localStorage.clear();
  };
  return (
    <React.Fragment>
      <div className="container mt-5">
        <Card title={props.loggedInProfile}>
          <Button
            label="Logout"
            width="100%"
            color="success"
            onClick={onEmpLogout}
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default EmployeeHome;

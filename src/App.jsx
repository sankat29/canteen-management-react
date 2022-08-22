import React, { useState } from "react";

import AdminHome from "./components/admin/AdminHome";
import Authenticate from "./components/auth/Authenticate";
import EmployeeHome from "./components/employee/EmployeeHome";

function App() {
  const isLoggedIn = JSON.parse(localStorage.getItem("LOGGED_IN"));
  const loggedRole = isLoggedIn?.ROLE;
  const [didLoginHappen, setDidLoginHappen] = useState(
    isLoggedIn ? true : false
  );
  const [loggedInProfile, setLoggedInProfile] = useState(loggedRole);
  const renderHome =
    loggedInProfile === "ADMIN" ? (
      <AdminHome
        loggedInProfile={loggedInProfile}
        didLoginHappen={setDidLoginHappen}
        setLoggedInProfile={setLoggedInProfile}
      />
    ) : (
      <EmployeeHome
        loggedInProfile={loggedInProfile}
        didLoginHappen={setDidLoginHappen}
        setLoggedInProfile={setLoggedInProfile}
      />
    );
  return (
    <React.Fragment>
      <main>
        {!didLoginHappen && (
          <Authenticate
            setLoggedInProfile={setLoggedInProfile}
            setLoginAction={setDidLoginHappen}
          />
        )}
        {didLoginHappen && renderHome}
      </main>
    </React.Fragment>
  );
}

export default App;

import React from "react";

import { useHistory, useLocation } from "react-router-dom";
import AdminContextProvider from "contexts/AdminContext";

const AuthRequired = (props) => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  console.log("check path", path);

  const check =
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === null;
  if (check) {
    localStorage.clear();
    history.push("/auth/login");
  }
  let remember = localStorage.getItem("remember");
  if (remember !== undefined) {
    var dateRemember = remember;
    var dateNow = new Date();
    console.log(dateNow);
    var timestampNow = dateNow.getTime();

    console.log(timestampNow + " : " + dateRemember);
    if (Number(timestampNow) > Number(dateRemember)) {
      localStorage.clear();
      history.push("/auth/login");
    }
  }
  // if(userJwt !==undefined){
  //     var date = new Date();
  //     var timestamp = date.getTime();
  //     console.log(userJwt.exp * 1000 + " : " + timestamp);
  //     if(Number(userJwt.exp) * 1000 < Number(timestamp)){
  //         history.push('/auth/login')
  //     }
  // }
  return !check ? (
    <AdminContextProvider>
      <props.Render />
    </AdminContextProvider>
  ) : (
    <></>
  );
};
export default AuthRequired;

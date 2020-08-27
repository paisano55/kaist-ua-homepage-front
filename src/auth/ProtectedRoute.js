import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import * as adminAPI from "../lib/api/admin";

const UserRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const checkUser = () => {
    adminAPI
      .check()
      .then(res => {
        if (res.data.auth === "admin") {
          setAuth(true);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(err => setLoading(false));
  };
  useEffect(() => checkUser(), []);
  if (loading) return <div />;
  return (
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to="/web/main" />
      }
    />
  );
};

export default UserRoute;

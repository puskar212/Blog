import Router from "next/router";
import { useEffect } from "react";
import { isAuth } from "../../actions/auth";

const Private = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/404`);
    }
  }, []);
  return <>{children}</>;
};

export default Private;

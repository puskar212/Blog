import Router from "next/router";
import { isAuth } from "../../actions/auth";

const dashBoard = () => {
  if (isAuth() && isAuth().role === 0) {
    Router.push(`/user`);
  } else if (isAuth() && isAuth().role === 1) {
    Router.push(`/admin`);
  }
};

export default dashBoard;

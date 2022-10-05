import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";

import { CurrentUser } from "../redux/actions";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem(authToken);
    navigate("/login");
  };

  return <>{handleLogout}</>;
};

export default Logout;

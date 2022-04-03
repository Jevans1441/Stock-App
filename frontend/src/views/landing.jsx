import { Route, Routes, Navigate } from "react-router-dom";
import Crypto from "../components/crypto";
import Home from "../components/home";
import Login from "../components/login";
import Stock from "../components/stock";
import Register from "../components/register";
import NotFound from "../components/404";
import { Header } from "../sectioning";
import Logout from "../components/logout";

const landing = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Routes>
        <Route>
          <Route path="/news" element={<Home />} />
        </Route>

        <Route path={"/stocks/:name"} element={<Stock />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default landing;

import { Route, Routes, Navigate } from "react-router-dom";
import Crypto from "../components/crypto";
import Home from "../components/home";
import Login from "../components/login";
import Stock from "../components/stock";
import Register from "../components/register";

const landing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/stocks" element={<Stock />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default landing;

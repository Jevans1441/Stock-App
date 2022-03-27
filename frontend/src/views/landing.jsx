import { Route, Routes } from "react-router-dom";
import Crypto from "../components/crypto";
import Home from "../components/home";
import Stock from "../components/stock";

const landing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/crypto" element={<Crypto />} />
      </Routes>
    </>
  );
};

export default landing;

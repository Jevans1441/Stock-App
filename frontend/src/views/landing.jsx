import { Route, Routes } from "react-router-dom";
import Home from "../components/home";
import Stock from "../components/stock";

const landing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </>
  );
};

export default landing;

import { Route, Routes } from "react-router-dom";
import Home from "../components/home";

const landing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default landing;

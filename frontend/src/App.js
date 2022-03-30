import NavBar from "./components/navbar";
import { Footer, Header, Main } from "./sectioning";
import { useEffect } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { setInitialState } from "./redux/reducers/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, []);
  return (
    <>
      <div className="App">
        <Header />
        <NavBar />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;

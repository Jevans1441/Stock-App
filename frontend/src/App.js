import NavBar from "./components/navbar";
import { Footer, Header, Main } from "./sectioning";
import "./styles.css";

function App() {
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

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Launch } from "./pages/Launch.tsx";
import { Navbar } from "./components/Navbar.tsx";
import About from "./pages/About.tsx";
function App() {
  return (
    <div className="outfit-font">
      <Navbar />
      <div className="" id="home">
      <Launch
        badge="Vishal Aakash"
        title1="Crafting intuitive Web3 frontends,"
        title2="powered by robust full-stack solutions." />
        </div>
      <div className="  " id="about">
        <About />
      </div>

    </div>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar.tsx";
import About from "./pages/About.tsx";
import Launch from "./pages/Launch.tsx";
import Projects from "./pages/Projects.tsx";

function App() {
  return (
    <div className="outfit-font">
      <Navbar />
      <div className="" id="home">
      <Launch />
        </div>
      <div className="  " id="about">
        <About />
      </div>
      <div className="  " id="projects">
        <Projects />
      </div>

    </div>
  );
}

export default App;

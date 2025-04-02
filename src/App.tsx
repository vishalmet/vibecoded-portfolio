import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { HeroGeometric } from "./pages/Launch.tsx";
import { Navbar } from "./components/Navbar.tsx";

function App() {
  return (
    <div className="outfit-font">
    {/* <Router> */}
    <Navbar />
      {/* <Routes>
        <Route 
          path="/"
          element={ */}
          
            <HeroGeometric 
            badge="Vishal Aakash"
            title1 = "Crafting intuitive Web3 frontends,"
            title2 = "powered by robust full-stack solutions." />
          {/* }
        /> */}
        {/* <Route path="/works" element={<h1>Works Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} /> */}
      {/* </Routes> */}
    {/* </Router> */}
    </div>
  );
}

export default App;

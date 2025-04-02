import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Launch from "./pages/Launch.jsx";
import { HeroGeometric } from "./pages/Launch.js";

function App() {
  return (
    <div className="outfit-font">
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            <HeroGeometric badge="Vishal Aakash"
            title1 = "Crafting intuitive Web3 frontends,"
            title2 = "powered by robust full-stack solutions." />
          }
        />
        {/* <Route path="/works" element={<h1>Works Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;

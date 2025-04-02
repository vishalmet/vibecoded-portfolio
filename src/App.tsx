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
            <HeroGeometric badge="Kokonut UI"
            title1 = "Elevate Your"
            title2 = "Digital Vision" />
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

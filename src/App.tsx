import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Launch from "./pages/Launch.jsx";
import Cursor from "../src/components/cursor.jsx"

function App() {
  return (
    // <Cursor>
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            <Launch
              count={75}
              gravity={0.7}
              friction={0.8}
              wallBounce={0.95}
              followCursor={false}
            />
          }
        />
        {/* <Route path="/works" element={<h1>Works Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} /> */}
      </Routes>
    </Router>
    // </Cursor>
  );
}

export default App;

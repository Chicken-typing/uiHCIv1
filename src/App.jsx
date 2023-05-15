
import "./styles/App.scss";
import Router from "./Router";
import validateToken from "./services/validateToken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function App() {
  useEffect(() => {
    validateToken()
  });
  return (
    <div className="App">
      <Router>
      </Router>

    </div>
  );
}

export default App;


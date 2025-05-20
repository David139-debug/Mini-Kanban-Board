import Board from "./Components/Board/Board"
import Login from "./Components/Authorization/Login"
import RequireAuth from "./Components/RequireAuth"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./Components/Authorization/Settings"
import Register from "./Components/Authorization/Register";
import RedirectIfAuth from "./Components/isAuthenticated";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Board />} />
          <Route element={<RequireAuth />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

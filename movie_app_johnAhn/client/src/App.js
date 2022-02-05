import "./App.css";
import LandingPage from "./components/views/Landingpage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import { Route, Routes } from "react-router-dom";
import Auth from "./hoc/auth";

function App() {
    const HocLandingPage = Auth(LandingPage, null);
    const HocLoginPage = Auth(LoginPage, false);
    const HocRegisterPage = Auth(RegisterPage, false);

    return (
        <Routes>
            <Route path="/" element={<HocLandingPage />} />
            <Route path="/login" element={<HocLoginPage />} />
            <Route path="/register" element={<HocRegisterPage />} />
        </Routes>
    );
}

export default App;

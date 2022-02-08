import "./App.css";
import LandingPage from "./components/views/Landingpage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./components/hoc/auth";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";

function App() {
    const HocLandingPage = Auth(LandingPage, null);
    const HocLoginPage = Auth(LoginPage, false);
    const HocRegisterPage = Auth(RegisterPage, false);
    const HocVideoUploadPage = Auth(VideoUploadPage, true);

    return (
        <>
            <NavBar />
            <div style={{ height: "70px" }}></div>
            <Routes>
                <Route path="/" element={<HocLandingPage />} />
                <Route path="/login" element={<HocLoginPage />} />
                <Route path="/register" element={<HocRegisterPage />} />
                <Route path="/video/upload" element={<HocVideoUploadPage />} />
            </Routes>
        </>
    );
}

export default App;

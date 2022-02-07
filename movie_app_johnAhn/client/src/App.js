import "./App.css";
import LandingPage from "./components/views/Landingpage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import { Route, Routes } from "react-router-dom";
import Auth from "./hoc/auth";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import FavoritePage from "./components/views/FavoritePage/FavoritePage";

function App() {
    const HocLandingPage = Auth(LandingPage, null);
    const HocLoginPage = Auth(LoginPage, false);
    const HocRegisterPage = Auth(RegisterPage, false);
    const HocMovieDetail = Auth(MovieDetail, null);
    const HocFavoritePage = Auth(FavoritePage, true);

    return (
        <Routes>
            <Route path="/" element={<HocLandingPage />} />
            <Route path="/login" element={<HocLoginPage />} />
            <Route path="/register" element={<HocRegisterPage />} />
            <Route path="/movie/:movieId" element={<HocMovieDetail />} />
            <Route path="/favorite" element={<HocFavoritePage />} />
        </Routes>
    );
}

export default App;

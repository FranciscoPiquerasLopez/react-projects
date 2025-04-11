import { Routes, BrowserRouter, Route } from "react-router";
import App from "../App";
import MovieInformation from "../components/MovieInformation";

const MovieRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<App />} />
                <Route path="/movie/:movieId" element={<MovieInformation />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MovieRoutes;
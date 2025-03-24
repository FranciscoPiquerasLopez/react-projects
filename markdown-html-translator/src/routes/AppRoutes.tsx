import { Route, Routes } from "react-router";
import Introduction from "../components/Introduction";
import App from "../App";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index path="/" element={<App />} />
            <Route path="/introduction" element={<Introduction />} />
        </Routes>
    );
}

export default AppRoutes;
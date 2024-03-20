
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export const StudentApp = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

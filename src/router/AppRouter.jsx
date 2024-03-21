import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage, SummaryPage, HomePage } from "../pages/";
import { StudentApp } from "../StudentApp";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<StudentApp />}>
                <Route index element={<HomePage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="summary" element={<SummaryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

import { Navigate, Route, Routes } from 'react-router-dom'
import { RegisterPage } from '../pages/RegisterPage'
import { SummaryPage } from '../pages/SummaryPage'
import { StudentApp } from '../StudentApp'
import { HomePage } from '../pages/HomePage'

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
    )
}

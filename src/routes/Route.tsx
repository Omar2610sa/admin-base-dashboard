import HomePage from '@/pages/Home/HomePage';
import Sections from '@/pages/Sections/Sections';

import { Routes, Route } from "react-router-dom";

const RoutePaths = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />

            {/* Placeholder routes to keep sidebar navigation functional */}
            <Route path="/sections" element={<Sections />} />
            <Route path="/features" element={<HomePage />} />
            <Route path="/contacts" element={<HomePage />} />
            <Route path="/applications" element={<HomePage />} />
            <Route path="/countries" element={<HomePage />} />
            <Route path="/cities" element={<HomePage />} />
            <Route path="/admin-notifications" element={<HomePage />} />
            <Route path="/notifications" element={<HomePage />} />
        </Routes>
    )
}

export default RoutePaths

import HomePage from '@/pages/Home/HomePage';

import { Routes, Route } from "react-router-dom";

const RoutePaths = () => {
    return (
        <>
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
        </>
    )
}

export default RoutePaths
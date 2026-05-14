import AuthLayout from '@/components/Layouts/AuthLayout';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Login from '@/pages/Auth/Login';
import HomePage from '@/pages/Home/HomePage';
import Sliders from '@/pages/Sliders/Sliders';

import { Routes, Route } from "react-router-dom";
import ProtectRoute from './ProtectRoute';

const RoutePaths = () => {
    return (
        <Routes>


            {/* Authentication Layout */}

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>


            {/* Protect Auth */}
            <Route element={<ProtectRoute />}>

                {/* Default Layout */}
                <Route element={<DefaultLayout />}>

                    <Route path="/home" element={<HomePage />} />
                    <Route path="/" element={<HomePage />} />

                    {/* Placeholder routes to keep sidebar navigation functional */}
                    <Route path="/sliders" element={<Sliders />} />
                    <Route path="/features" element={<HomePage />} />
                    <Route path="/contacts" element={<HomePage />} />
                    <Route path="/applications" element={<HomePage />} />
                    <Route path="/countries" element={<HomePage />} />
                    <Route path="/cities" element={<HomePage />} />
                    <Route path="/admin-notifications" element={<HomePage />} />
                    <Route path="/notifications" element={<HomePage />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default RoutePaths

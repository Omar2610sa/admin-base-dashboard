import AuthLayout from '@/components/Layouts/AuthLayout';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Login from '@/pages/Auth/Login';
import HomePage from '@/pages/Home/HomePage';

import { Routes, Route } from "react-router-dom";
import ProtectRoute from './ProtectRoute';
import Contacts from '@/pages/Contacts/Contacts';
import Role from '@/pages/Role/Role';
import Cities from '@/pages/Cities/Cities';
import Countries from '@/pages/Countries/Countries';
import Slider from '@/pages/Sliders/Sliders';

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
                    <Route path="/sliders" element={<Slider />} />
                    <Route path="/features" element={<HomePage />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/applications" element={<HomePage />} />
                    <Route path="/countries" element={<Countries />} />
                    <Route path="/admin-notifications" element={<HomePage />} />
                    <Route path="/notifications" element={<HomePage />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/cities" element={<Cities />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default RoutePaths

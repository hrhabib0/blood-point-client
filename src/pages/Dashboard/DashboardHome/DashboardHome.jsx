import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import DonorHome from './DonorHome';
import AdminHome from './AdminHome';

const DashboardHome = () => {
    const { role } = useUserRole()
    console.log(role)
    if (!role) return <LoadingSpinner></LoadingSpinner>

    if (role === 'donor') return <DonorHome />;
    if (role === 'admin') return <AdminHome/>;

    return <p>Unknown User</p>
};

export default DashboardHome;
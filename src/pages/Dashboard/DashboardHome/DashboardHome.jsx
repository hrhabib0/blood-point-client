import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import DonorHome from './DonorHome';

const DashboardHome = () => {
    const { role } = useUserRole()
    console.log(role)
    if (!role) return <LoadingSpinner></LoadingSpinner>

    if (role === 'donor') return <DonorHome />;

    return <p>Unknown User</p>
};

export default DashboardHome;
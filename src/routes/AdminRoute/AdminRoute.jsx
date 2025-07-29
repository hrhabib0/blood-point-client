import React, { use } from 'react';
import useUserRole from '../../hooks/useUserRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const AdminRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    const {role, isLoading} = useUserRole()

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    } 
    if(!user || role !== 'admin'){
       return <Navigate state={{from:location.pathname}} to="/forbidden"></Navigate>
    }
    return children;
};

export default AdminRoute;
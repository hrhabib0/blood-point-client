import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if(!user){
       return <Navigate state={{from:location.pathname}} to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;
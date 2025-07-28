import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import useAxiosSecure from './useAxiosSecure';


const useUserRole = () => {
    const { user, loading: authLoading } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {
        data: role,
        isLoading,
        refetch,
        isError,
        error,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data?.role || 'donor';
        },
    });

    return { role, isLoading, isError, error, refetch };
};

export default useUserRole;

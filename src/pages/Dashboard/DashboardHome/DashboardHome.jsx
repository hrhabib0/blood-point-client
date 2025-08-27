import useUserRole from '../../../hooks/useUserRole';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import DonorHome from './DonorHome';
import AdminHome from './AdminHome';

const DashboardHome = () => {
    const { role } = useUserRole()

    if (!role) return <LoadingSpinner></LoadingSpinner>

    if (role === 'donor') return <DonorHome />;
    if (role === 'admin' || role === 'volunteer' ) return <AdminHome/>;

    return <p>Unknown User</p>
};

export default DashboardHome;
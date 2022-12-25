import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../../Pages/Loader/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <process className='progress w-56'><Loader></Loader>  </process>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace ></Navigate>
};

export default PrivateRoute;
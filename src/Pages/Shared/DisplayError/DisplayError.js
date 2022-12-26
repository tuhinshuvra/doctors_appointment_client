import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User Logout Successfully')
                navigate('/');
            })
            .catch(error => console.log(error.message))
    }
    return (
        <div>
            <h2 className=' text-center text-red-600'>Sorry! Something went Wrong</h2>
            <p className=' text-center text-red-600'> <i>{error.statusText || error.message}</i></p>
            <p className=' text-center text-blue-700'>Please <button onClick={handleLogOut} >LogOut</button> and Logback in</p>
        </div>
    );
};

export default DisplayError;
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import './Login.css';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.form?.pathname || '/';
    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        signin(data.email, data.password)
            .then(result => {
                console.log("UserData:", result.user);
                toast.success('User login successfully');
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log("Login Error: ", error.message)
                setLoginError(error.message);
            });
    }

    return (
        <div className=' h-[500px] flex justify-center items-center'>
            <div className=' '>
                <h2 className=' text-3xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div> {loginError && <p className=' text-red-600'>{loginError}</p>}</div>
                    <label className="label"><span className="label-text font-bold">Email</span></label>
                    <input type="email"  {...register("email",
                        { required: 'Email is required' })}
                        className="input input-bordered w-full" placeholder="Email" />
                    {errors.email && <p className=' text-red-600' role="alert">{errors.email?.message}</p>}

                    <label className="label"><span className="label-text font-bold">Password</span></label>
                    <input type="password"  {...register("password", { required: 'Password is required' })}
                        className="input input-bordered  w-full" placeholder="Password" />
                    {errors.password && <p className=' text-red-600' role="alert">{errors.password?.message}</p>}

                    <label className="label"><span className="label-text">Forget Password ? </span></label>

                    <input className=' btn btn-sm btn-accent my-3 float-right w-full' value='Login' type="submit" />
                </form>
                <p>New to doctors portal<Link to='/signup' className=' text-primary'> Create New Account</Link> </p>
                <div className="divider">OR</div>
                <input className=' btn btn-sm btn-accent btn-outline my-3 float-right w-full' value='Continue with Google' type="submit" />
            </div>
        </div>
    );
};

export default Login;
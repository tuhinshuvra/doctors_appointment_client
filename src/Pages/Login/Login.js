import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [data, setData] = useState('');

    const handleLogin = (data) => {
        console.log(data);
    }
    return (
        <div className=' h-[500px] flex justify-center items-center'>
            <div className=' '>
                <h2 className=' text-3xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <label className="label"><span className="label-text font-bold">Email</span></label>
                    <input type="email"  {...register("email",
                        { required: 'Email is required' })}
                        className="input input-bordered w-full" placeholder="Email" />
                    {errors.email && <p className=' text-red-600' role="alert">{errors.email?.message}</p>}

                    <label className="label"><span className="label-text font-bold">Password</span></label>
                    <input type="password"  {...register("password",
                        {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be minumum 6 character' }
                        })}
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
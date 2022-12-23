import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import './Login.css';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [data, setData] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const { createUser } = useContext(AuthContext);

    const handleSignup = (data) => {
        console.log(data);
        setLoginError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("Singup User Data:", user);
                toast.success('User created Successfully');
                navigate('/');
            })
            .catch(error => {
                console.log("Signup Error: ", error.message);
                setLoginError(error.message);
            })
    }
    return (
        <div className=' h-[500px] flex justify-center items-center'>
            <div className=' '>
                <h2 className=' text-3xl text-center'>Signup</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div> {loginError && <p className=' text-red-600'>{loginError}</p>}</div>

                    <label className="label"><span className="label-text font-bold">Name</span></label>
                    <input type="name"  {...register("name",
                        { required: 'Name is required' })}
                        className="input input-bordered w-full" placeholder="name" />
                    {errors.name && <p className=' text-red-600' role="alert">{errors.name?.message}</p>}

                    <label className="label"><span className="label-text font-bold">Email</span></label>
                    <input type="email"  {...register("email",
                        { required: 'Email is required' })}
                        className="input input-bordered w-full" placeholder="Email" />
                    {errors.email && <p className=' text-red-600' role="alert">{errors.email?.message}</p>}

                    <label className="label"><span className="label-text font-bold">Password</span></label>
                    <input type="password"  {...register("password",
                        {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be minumum 6 character' },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])/,
                                message: 'Password must have a capital letter, a special character and a number'
                            }
                        })}
                        className="input input-bordered  w-full" placeholder="Password" />
                    {errors.password && <p className=' text-red-600' role="alert">{errors.password?.message}</p>}

                    <input className=' btn btn-sm btn-accent my-3 float-right w-full' value='Signup' type="submit" />
                </form>
                <p>Already have an account? please<Link to='/login' className=' text-primary'> Login </Link> </p>
                <div className="divider">OR</div>
                <input className=' btn btn-sm btn-accent btn-outline my-3 float-right w-full' value='Continue with Google' type="submit" />
            </div>
        </div>
    );
};

export default Signup;
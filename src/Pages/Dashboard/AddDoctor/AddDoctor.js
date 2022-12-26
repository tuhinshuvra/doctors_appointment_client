import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const respone = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await respone.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    const handleAddDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    // save doctors information to database
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`Doctor ${data.name} data saved successfully.`);
                            navigate('/dashboard/managedoctors');
                        })
                }
            })
    }

    return (
        <div className=' w-96 mx-auto'>
            <h2 className=' text-3xl text-center'>Add Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
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

                <label className="label"><span className="label-text font-bold">Sepcialty</span></label>
                <select
                    {...register('specialty')}
                    className="select input-bordered w-full">
                    <option disabled selected>Please select a specialty</option>
                    {
                        specialties.map(specialty =>
                            <option key={specialty._id} value={specialty.name}>
                                {specialty.name}
                            </option>
                        )
                    }
                </select>
                {/* {errors.email && <p className=' text-red-600' role="alert">{errors.email?.message}</p>} */}

                <label className="label"><span className="label-text font-bold">Photo</span></label>
                <input type="file"  {...register("image",
                    { required: 'Photo is required' })}
                    className="input input-bordered w-full" placeholder="Photo" />
                {errors.img && <p className=' text-red-600' role="alert">{errors.img?.message}</p>}

                <input className=' btn btn-accent my-3 float-right w-full' value='Add Doctor' type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;
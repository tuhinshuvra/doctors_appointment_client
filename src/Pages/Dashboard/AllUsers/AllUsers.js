import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const respone = await fetch('http://localhost:5000/users');
            const data = respone.json();
            return data;
        }
    })

    const handleMakeAdmin = (email) => {
        fetch(`http://localhost:5000/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('User Make Admin Successfully')
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className=' text-center my-4'>All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr className='hover' key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role === "admin" ? <p className='font-extrabold text-blue-800'>Admin</p> : <button className=' btn btn-sm btn-primary' onClick={() => handleMakeAdmin(user.email)}>Make Admin</button>} </td>
                                <td> <button className='btn btn-sm btn-error'>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
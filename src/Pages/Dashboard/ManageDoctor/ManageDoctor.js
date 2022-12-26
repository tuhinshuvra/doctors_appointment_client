import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../../Loader/Loader';
import ConfirmatinModal from '../../Shared/ConfirmationModal/ConfirmatinModal';

const ManageDoctor = () => {
    const [deletingDeoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null)
    }



    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const response = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = response.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })

    const handleDeletingDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {

                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                    refetch()
                }
            })

    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h2 className=' text-center my-4 font-bold'>Doctors List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor, index) => <tr key={doctor._id}>
                            <td className=' font-bold'>{index + 1}</td>
                            <td>
                                <div className=' avatar'>
                                    <div className=' w-20 rounded-full'>
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>{doctor.name}</td>
                            <td>{doctor.email}</td>
                            <td>{doctor.specialty}</td>
                            <td><label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error btn-sm">Delete</label></td>
                        </tr>)}
                    </tbody>
                </table>
                {
                    deletingDeoctor &&
                    <ConfirmatinModal
                        title={'Are you sure you want to delete the doctor?'}
                        message={`If you once delete ${deletingDeoctor.name} its cant be unode.`}
                        closeModal={closeModal}
                        successAction={handleDeletingDoctor}
                        successButtonName='Delete'
                        modalData={deletingDeoctor}
                    ></ConfirmatinModal>

                }
            </div>
        </div>
    );
};

export default ManageDoctor;
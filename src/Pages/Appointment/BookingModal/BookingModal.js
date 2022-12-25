import { format } from 'date-fns';
import React from 'react';
import Loader from '../../Loader/Loader';
import { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { user } = useContext(AuthContext);
    const { name, slots } = treatment;
    const [loading, setLoading] = useState(true);
    const date = format(selectedDate, 'PP')

    if (loading) {
        <Loader></Loader>
    }

    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            patientName: name,
            treatment: treatment.name,
            slot,
            email,
            phone,
        }
        console.log("Modal Data:", booking);

        // Todo sent submit data
        // ########################### 
        // after send submit data 

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed')
                    setLoading(false);
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-4">{name}</h3>

                    <form onSubmit={handleBooking}>
                        <input type="text" value={date} className="input input-bordered w-full mb-2" disabled />
                        <select name='slot' className="select select-bordered w-full mb-2">
                            {
                                slots.map((slot, index) =>
                                    <option
                                        key={index}
                                        value={slot}
                                    >
                                        {slot}
                                    </option>)
                            }
                        </select>
                        <input type="text" name='name' defaultValue={user?.displayName} disabled className="input input-bordered w-full  mb-2" />
                        <input type="email" name='email' defaultValue={user?.email} disabled className="input input-bordered w-full  mb-2" />
                        <input type="text" name='phone' placeholder="Phone" className="input input-bordered w-full  mb-2" />
                        <input type="submit" value='Submit' className='btn btn-accent w-full  mb-2' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
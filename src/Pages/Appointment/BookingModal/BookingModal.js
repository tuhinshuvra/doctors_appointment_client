import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    const { name, slots } = treatment;
    const date = format(selectedDate, 'PP')

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
        setTreatment(null);
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
                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered w-full  mb-2" />
                        <input type="email" name='email' placeholder="Email Address" className="input input-bordered w-full  mb-2" />
                        <input type="text" name='phone' placeholder="Phone" className="input input-bordered w-full  mb-2" />
                        <input type="submit" value='Submit' className='btn btn-accent w-full  mb-2' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
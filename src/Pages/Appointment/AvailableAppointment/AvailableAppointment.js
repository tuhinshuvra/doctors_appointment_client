import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({ selectedDate }) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch('appointmentOptions.json')
            .then(response => response.json())
            .then(data => setAppointmentOptions(data))
    }, [])
    return (
        <section className='text-center my-16'>
            <p className=' text-primary'> <b> You have selected {format(selectedDate, 'PP')} </b></p>
            <div className=' grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    appointmentOptions.map(option =>
                        <AppointmentOption
                            key={option._id}
                            appointmentOption={option}
                            setTreatment={setTreatment}
                        ></AppointmentOption>)
                }

            </div>
            {
                treatment &&
                <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;
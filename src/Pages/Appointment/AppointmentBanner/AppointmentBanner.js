import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Chair from '../../../assets/images/chair.png';
import './AppointmentBanner.css';
const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <header className='appointment-banner'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse my-6">
                    <img src={Chair} className="max-w-sm rounded-lg shadow-2xl mr-6" alt='dentist chair' />
                    <div>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        ></DayPicker>
                        {/* <p> <b> You have selected {format(selectedDate, 'PP')} </b></p> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;
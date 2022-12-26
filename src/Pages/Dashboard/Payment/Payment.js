import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);
console.log("stripePromise : ", stripePromise);

const Payment = () => {
    const booking = useLoaderData()
    const navigation = useNavigation();
    const { treatment, price, appointmentDate, slot } = booking;

    if (navigation.state === "loading") {
        return <Loader></Loader>
    }

    return (
        <div>
            <h2 className=' text-3xl mt-10'>Payment for {treatment}</h2>
            <p className='text-2xl'>Please pay <strong> ${price}</strong> for your appointment on {appointmentDate} at {slot} </p>
            <div className=' w-96 mt-6'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
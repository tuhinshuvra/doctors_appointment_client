import React from 'react';
import './Loder.css';

const Loader = () => {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;
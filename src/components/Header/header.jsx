import React, { useEffect, useState } from 'react';

import "../../style/header.css";

function Header() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const currDate = new Date();
            const hours = currDate.getHours();
            const minutes = currDate.getMinutes();
            const seconds = currDate.getSeconds();
            setCurrentTime(` ${hours} : ${minutes} : ${seconds}`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="header">
            <div className="title">
                this is Title
            </div>
            
            <div className="currtime">
                {currentTime}
            </div>
            
        </div>
    );
}

export default Header;

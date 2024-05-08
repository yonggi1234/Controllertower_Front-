import React, { useEffect, useState } from 'react';

function Header() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const currDate = new Date();
            const hours = currDate.getHours();
            const minutes = currDate.getMinutes();
            const seconds = currDate.getSeconds();
            setCurrentTime(`현재 시간 : ${hours}시 ${minutes}분 ${seconds}초`);
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
            <div className="buttons">
                <a className="pButton p1" href="./practice.html?p=1">page 1</a>
                <a className="pButton p2" href="./practice.html?p=2">page 2</a>
                <a className="pButton p3" href="./practice.html?p=3">page 3</a>
            </div>
        </div>
    );
}

export default Header;

import React from 'react';
<<<<<<< HEAD

=======
import { Link } from 'react-router-dom';
>>>>>>> origin/yonggi
import '../../style/hd.css';

const HeaderBottom = () => {
    return (
        <div className='hd-container'>
            <div className="box">
                <input type="checkbox" id="toggle" className="checkbox" />
                <div className="cross">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
<<<<<<< HEAD
=======
            <div className="buttons">
                <div className="pButton p1">
                    <Link to="/">Home</Link>
                </div>
                <div className="pButton p2">
                    <Link to="/video">List</Link>
                </div>
            </div>
>>>>>>> origin/yonggi
        </div>
    );
};

export default HeaderBottom;

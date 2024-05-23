import React from 'react';

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
        </div>
    );
};

export default HeaderBottom;

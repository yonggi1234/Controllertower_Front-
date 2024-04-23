import React from 'react';
import '../../style/header.css'

const header = () => {
    return (
        <div>
            <div className="header-container">
                <div className="header-tool">
                    <div className="multibox">
                        <span className="header-logo">
                            <a href="#" className="logo">
                                <div className="logo-id">
                                    <div className="logo-text">
                                        <h5 className='logo-font'>HIHI</h5>
                                    </div>
                                </div>
                            </a>
                        </span>
                        <button className="hamburger" tabindex= "0" type="button">
                            <div className="button-rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className='svg'>
                                    <path d="M4 6l16 0" fill="#ede7f6" stroke="#5e35b1"></path>
                                    <path d="M4 12l16 0" fill="#ede7f6" stroke="#5e35b1"></path>
                                    <path d="M4 18l16 0" fill="#ede7f6" stroke="#5e35b1"></path>
                                </svg>
                            </div>
                        </button>

                    </div>
                    <div className="page-1">
                        <div className="page-root">hih</div>
                    </div>
                    <div className="page-2"></div>
                    <div className="page-3"></div>

                </div>
            </div>
        </div>
    );
};

export default header;
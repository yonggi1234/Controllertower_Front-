import React from 'react';
import '../../style/nav.css';

const nav = () => {
    return (
        <div>
            
            <nav className="nav-container">
                <div className="nav-header">
                    <div className="nav-body">
                        <div className="nav-page">
                            <ul className="video-list">
                                <span className="video">Video</span>
                                <div className="video-id">
                                    <div className="text">
                                        <h5 className='text-font'>HIHI</h5>
                                    </div>
                                </div>
                            </ul>
                            <hr className="horizon" />
                            <ul className="video-status">

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>            
        </div>
    );
};

export default nav;
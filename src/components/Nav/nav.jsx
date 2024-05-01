import React, { Component } from 'react';
import '../../style/nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="left_content">
                <div className="list">
                    <div className="list_header">
                        <p>🎞️VIDEOS</p>
                    </div>
                    <div className="camera_list" id="cameraList">
                        {[...Array(10)].map((_, i) => (
                            <div className="li" key={i}>
                                camera_name{i}
                            </div>
                        ))}
                    </div>
                    
                </div>
                <hr className='divider'/>
                <div className="warnings">
                    <div className="warning_header">
                        <p>⚠️ warning</p>
                    </div>
                    <div className="warning_list" id="cameraList">
                        {/* {[...Array(50)].map((_, i) => ( */}
                            {/* <div className="wli" key={i}> */}
                            <div className="wli">camera_name1</div>
                            <div className="wli">camera_name2</div>
                            <div className="wli">camera_name1</div>
                            <div className="wli">camera_name4</div>
                            <div className="wli">camera_name1</div>
                            <div className="wli">camera_name1</div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;

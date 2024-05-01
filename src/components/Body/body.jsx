import React from 'react';
import "../../style/body.css"
import VideoBoard from '../Body/VideoBoard';
import ScreenRef from './ScreenRef';

function Body() {

    
    return (
            <div className="screen">
                <VideoBoard/>

                
                {/* <ScreenRef/> */}
            </div>
    );
}

export default Body;

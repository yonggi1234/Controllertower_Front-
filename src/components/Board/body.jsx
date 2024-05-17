import React from 'react';
import "../../style/body.css"
import VideoBoard from './VideoBoard';
import SSE from '../../components/SSE/SSEVideo';

function Body() {

    
    return (
            <div className="screen">
                {/* <SSE/> */}
                <VideoBoard/>
            </div>
    );
}

export default Body;

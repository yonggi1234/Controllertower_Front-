import React, { Component } from 'react';

class MyComponent extends Component{
    
    render(){
        return(
            <div>
                <button onClick={() =>{
                    this.setState({
                        number: this.state.number+1
                    })
                }}>더하기</button>
            </div>
        )
    }
}
export default MyComponent;
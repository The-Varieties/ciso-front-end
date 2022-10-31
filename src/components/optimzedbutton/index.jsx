import React from 'react';

function OptimizedInstance(props){

    return(
        <div>
            <button onClick={() => alert('Button clicked!')}>{this.state.count}</button>;
        </div>
    )
}

export default OptimizedInstance;
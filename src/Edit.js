import React from 'react'

export const Edit = () => {
    fetch('http://localhost:5000')
    .then(response => response.json())
    //.then(data => console.log(data));

    return <div className="container">Edit item</div>
    
};

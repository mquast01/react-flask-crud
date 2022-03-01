import React from 'react'
import { useForm } from 'react-hook-form'

export const Create = () => {
    const {register, handleSubmit} = useForm()
    
    return (
        <div className="container">
            <div className='mt-3'><h3>Create User</h3></div>
            <form onSubmit={handleSubmit((data) => {
                // Simple POST request with a JSON body using fetch
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify(data)
                };
                console.log(requestOptions.body)
                fetch('http://localhost:5000/create', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });
            })}>
                <div className="form-group">
                    <label htmlFor="Name">
                        Name:
                    </label>
                    <input class="form-control" type="text" {...register("Name")} id="Name" placeholder='Name'/>
                    
                    <label htmlFor="Id">
                        Id:
                    </label>
                    
                    <input class="form-control" type="number" min="0" {...register("Id")} id="Id" placeholder='Id'/>
                    
                    <label htmlFor="Score">
                    Score:
                    </label>
                    <input class="form-control" type="number" min="0" {...register("Points")} id="Score" placeholder='Score'/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create User</button>
                </div>
            </form>
        </div>
    );
};


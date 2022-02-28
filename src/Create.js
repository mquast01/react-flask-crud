import React from 'react'
import { useForm } from 'react-hook-form'

export const Create = () => {
    const {register, handleSubmit} = useForm()
    return (
        <div className="container">
            <div className='mt-3'><h3>Create User</h3></div>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
            })}>
                <div className="form-group">
                    <label htmlFor="Name">
                        Name:
                    </label>
                    <input type="text" {...register("Name")} id="Name"/>
                    <label htmlFor="Id">
                        Id:
                    </label>
                    <input type="number" min="0" {...register("Id")} id="Id"/>
                    <label htmlFor="Score">
                    Score:
                    </label>
                    <input type="number" min="0" {...register("Score")} id="Score"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create User</button>
                </div>
            </form>
        </div>
    );
};


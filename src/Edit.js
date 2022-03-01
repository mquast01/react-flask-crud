import { React, useState, useEffect }  from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';


export const Edit = () => {
    let { id } = useParams()

    const {register, handleSubmit} = useForm({
        defaultValues: {
            Id: id
        }
    })
    const [user, setUser] = useState([])

    //React Hook useEffect has missing dependencies: 'id' and 'user'. Either include them or remove the dependency array
    useEffect(() => {
        fetch('http://localhost:5000/view/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data[0])
                console.log(user)
            });
    }, [])
    //TODO: Handle state problems in form w/ default
    return (
        <div className="container">
            <div className='mt-3'><h3>Edit User</h3></div>
            <form onSubmit={handleSubmit((data) => {
                // Simple POST request with a JSON body using fetch 
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    body: JSON.stringify(data)
                };
                console.log(requestOptions.body)
                fetch('http://localhost:5000/edit/' + id, requestOptions)
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
                    <input className="form-control" type="text" {...register("Name")} id="Name" defaultValue={user.Name}/>
                    
                    <label htmlFor="Id">
                        Id:
                    </label>
                    <input className="form-control" type="number" defaultValue={user.Id} disabled/>
                    
                    <label htmlFor="Score">
                    Score:
                    </label>
                    <input className="form-control" type="number" min="0" {...register("Points")} id="Score" defaultValue={user.Points} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update User</button>
                </div>
            </form>
        </div>
    );
};






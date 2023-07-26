import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Edit } from './Edit.js'
import { Delete } from './Delete.js'

export const View = () => {
    let { id } = useParams()

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_API_ADDRESS + '/view/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data)
            });
    }, [id])
    return (        
        <div className="container"> 
            <div>
                <table className="table table-striped">
                    <thead className="table-light">
                        <tr>
                            <td>#</td>
                            <td>Email</td>
                            <td>Id</td>
                            <td>Username</td>
                            <td>#</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index}</th>
                                <td>{user.email}</td>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td><Edit userProp={user}/></td>  
                                <td><Delete userProp={user}/></td>   
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};
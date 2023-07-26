import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Edit } from './Edit.js'
import { Delete } from './Delete.js'

export const UserList = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_API_ADDRESS + `/view`)
            .then(response => response.json())
            .then(data => {
                setUserList(data)
            });
    }, [])

    return (
        <div className="container">
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>            
            </div>
            <h3>User List</h3>
            <div>
                <table className="table table-striped">
                    <thead className="table-light">
                        <tr>
                            <th scope="column">#</th>
                            <th scope="column">Email</th>
                            <th scope="column">Id</th>
                            <th scope="column">Username</th>
                            <th scope="column">#</th>
                            <th scope="column">#</th>
                            <th scope="column">#</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index}</th>
                                <td>{user.email}</td>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td><Link to={`/view/${user.id}`} className='nav-link'>View</Link></td>  
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
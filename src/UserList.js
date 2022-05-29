import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const UserList = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000')
            .then(response => response.json())
            .then(data => {
                console.log(data)
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
                            <th scope="column">Name</th>
                            <th scope="column">Id</th>
                            <th scope="column">Points</th>
                            <th scope="column">#</th>
                            <th scope="column">#</th>
                            <th scope="column">#</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{user.Name}</td>
                                <td>{user.Id}</td>
                                <td>{user.Points}</td>
                                <td><Link to={`/view/${user.Id}`} className='nav-link'>View</Link></td>  
                                <td><Link to={`/edit/${user.Id}`} className='nav-link'>Edit</Link></td>
                                <td><Link to={`/delete/${user.Id}`} className='nav-link'>Delete</Link></td>   
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
        
    );
};
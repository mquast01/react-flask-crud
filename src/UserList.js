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
            <h3>User List</h3>
            <div>
                <table className="table table-striped">
                    <thead className="table-light">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Id</th>
                        <th scope="col">Points</th>
                        <th scope="col">#</th>
                        <th scope="col">#</th>
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
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};
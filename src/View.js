import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

export const View = () => {
    let { id } = useParams()
    //console.log(id)

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/view/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data)
            });
    }, [])
    return (
        <div className="container">
            <div>
                <table className="table table-striped">
                    <thead className="table-light">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Id</th>
                        <th scope="col">Points</th>
                        <th scope="col">#</th>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{user.Name}</td>
                                <td>{user.Id}</td>
                                <td>{user.Points}</td>
                                <td><Link to={`/edit/${user.Id}`} className='nav-link'>Edit</Link></td>                         
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};
import React, { useState, useEffect } from 'react'

export const UserList = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserList(data)
                //console.log(userList)
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
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{user.Name}</td>
                                <td>{user.Id}</td>
                                <td>{user.Points}</td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};
import { React, useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom';


export const Delete = () => {
    const [response, setResponse] = useState("Unsuccessful");
    let { id } = useParams()
    console.log(id)

    //React Hook useEffect has missing dependencies: 'id' and 'user'. Either include them or remove the dependency array
    useEffect(() => {
        console.log("SEFSFSEFS")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({Id: id})
        };
        console.log(id)
        fetch('http://localhost:5000/delete/' + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                    setResponse('Success:' + data);
                    })
                    .catch((error) => {
                    setResponse('Error:' + error);
            });
    }, [])
    //TODO: Handle state problems in form w/ default
    return (
        <div>{response}</div>
    );
};






import { React, useState }  from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Delete = (userProp) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({Id: id})
        };
        console.log(id)
        fetch(process.env.REACT_APP_API_ADDRESS + '/delete/' + id, requestOptions)
            .then(response => {
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
        }); 

        handleClose();

    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="Name">
                            Are you sure you want to delete?
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit(userProp.id)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};






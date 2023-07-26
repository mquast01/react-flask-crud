import { React, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const Edit = ({ userProp }) => {
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = data => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(data)
        };
        console.log(requestOptions.body)
        fetch(process.env.REACT_APP_API_ADDRESS + '/edit/' + userProp.id, requestOptions)
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
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing for {userProp.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                {...register("email")}
                                type="email" 
                                placeholder="Enter email" 
                                defaultValue={userProp.email}
                            />
                            <Form.Text className="text-muted">
                                We'll share your email with everyone.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                {...register("username")}
                                type="Username" 
                                placeholder="Username" 
                                defaultValue={userProp.username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNickname">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control 
                                {...register("nickname")}
                                type="nickname" 
                                placeholder="Nickname" 
                                defaultValue={userProp.nickname}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};






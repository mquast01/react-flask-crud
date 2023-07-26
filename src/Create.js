import { React } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export const Create = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(data)
        };
        fetch(process.env.REACT_APP_API_ADDRESS + '/create', requestOptions)
            .then(response => {
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div onClick={e => e.stopPropagation()}>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                {...register("username")}
                                type="Username"
                                placeholder="Username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNickname">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                {...register("nickname")}
                                type="nickname"
                                placeholder="Nickname"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                {...register("email")}
                                type="email"
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">
                                We'll share your email with everyone.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                {...register("password")}
                                type="password"
                                placeholder="Enter password"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};






import { React, useState } from 'react'
import { Create } from './Create'
import { Edit } from './Edit'
import { UserList } from './UserList'
import { View } from './View'
import { Delete } from './Delete'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [createShow, setCreateShow] = useState(false);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={(e) => {
              e.preventDefault()
              setCreateShow(true)
            }}>
              Create
              <Create show={createShow} onHide={() => setCreateShow(false)}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route exact path="/" element={<UserList/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/view/:id" element={<View/>}/>
        <Route path="/delete/:id" element={<Delete/>}/>
      </Routes>
    </div>
  );
}

export default App;

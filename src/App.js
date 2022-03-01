import React from 'react'
import { Create } from './Create'
import { Edit } from './Edit.js'
import { UserList } from './UserList'
import { View } from './View'

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <nav className='navbar bg-light navbar-expand-lg navbar-light'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to="/" className='nav-link'>Home</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/create" className='nav-link'>Create</Link>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className='navbar-item'>
            Matthew Quast 447
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<UserList/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/view/:id" element={<View/>}/>

      </Routes>
    </div>
  );
}

export default App;

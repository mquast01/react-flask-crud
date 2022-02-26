import React from 'react'
import { Create } from './Create.js'
import { Edit } from './Edit.js'
import { List } from './List.js'

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
            <Link to="/edit/:id" className='nav-link'>Edit</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/create" className='nav-link'>Create</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" component={List}/>
        <Route path="/edit" component={Edit}/>
        <Route path="/create" component={Create}/>
      </Routes>
    </div>
  );
}

export default App;

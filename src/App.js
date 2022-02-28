import React from 'react'
import { Create } from './Create'
//import { Edit } from './Edit.js'
import { UserList } from './UserList'

import {
  Routes,
  Route,
  Link
} from "react-router-dom";


/*       <Route path="/edit" component={Edit}/>
<li className='navbar-item'>
<Link to="/edit/:id" className='nav-link'>Edit</Link>
</li>
*/

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
      </nav>
      <Routes>
        <Route exact path="/" element={<UserList/>}/>
        <Route path="/create" element={<Create/>}/>

      </Routes>
    </div>
  );
}

export default App;

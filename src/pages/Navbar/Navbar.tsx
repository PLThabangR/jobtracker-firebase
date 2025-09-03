
import Search from '../Search/Search'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const Navigate = useNavigate();
  const handleLogout = () => {
   // localStorage.removeItem('token');
    localStorage.clear()
    Navigate('/');
  }
  return (
    <>
   <div  className='navbar-style'>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className='router-links' to={'/home'}><h1 className="navbar-brand main-header post-job" >Job Tracker</h1></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item" >
          <Link className='router-links' to={'/create-jobs'}><h1 className="nav-link post-job" >Post a job</h1></Link>
        </li>
       
       
      </ul>
      {/* Search component */}
     <Search/>
     <button className="btn btn-outline-danger" onClick={() => handleLogout()}>Logout</button>
    </div>
  </div>
</nav>
   </div>


    </>
  )
}

export default Navbar
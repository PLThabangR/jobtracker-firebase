
import { useNavigate } from 'react-router-dom';
import './landing.css'
const LandingPage = () => {
  const Navigate = useNavigate();
    const handleSignUp = () => {
      Navigate('/register');
    }
    const handleLogin = () => {
      Navigate('/login');
    }
  return (
    <>
      <div className='header'>
        <h1 className="main-heading">Track Every Job Application.</h1>
       <h2 className="primary-haeding">
  Organize, monitor, and follow up on all your job applications in one simple dashboard.
</h2>
    <div className="btn-container">
<button className="landing-btn " onClick={() => handleSignUp()}>Sign up</button>
  <button className="landing-btn" onClick={() => handleLogin()}>LogIn</button>
    </div>
 
</div>
    </>
  )
}

export default LandingPage
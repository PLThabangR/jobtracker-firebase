import React, { use, useState } from 'react'
import { useUsers } from '../../globalState/usersStore';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  email: string,
  password: string
}
const LoginForm = () => {
//Hooks
 const Navigate = useNavigate();
  const {users , getAllUsers} = useUsers();
  const [user,setUser] = useState<User>({
    email: '',
    password: ''
  });


  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
   
    //Validation
    if(!user.email || !user.password) {
      return toast.error('Please enter email and password');
    }
    if(user.email.length<5) {
      return toast.error('Email is too short');
    }
    if(user.password.length<4) {
      return toast.error('Password is too short');
    }

    //Login
    //we use await so that we can wait for the promise to resolve
const {success, message} = await getAllUsers(user.email.trim(),user.password.trim());
//check if login was successful
//the await will wait for the getAllUsers function to resolve all its opration before feedback
//is given to success and message
if(success){
  
  toast.success(message);
     //set token to local storage
    localStorage.setItem('token', 'true');
    //set email to local storage 
    //we can even use redis for storing tokens
    localStorage.setItem('email',user.email);
    // use the useNavigate hook

//redirect to the home page
    Navigate('/home');
}else{
  toast.error(message);
}

  }
  return (
    <>
 <div className='container content'>
    <form onSubmit={handleLogin}>
 <h1 className='form-header'>Login</h1>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} id="email"/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
  </div>
 

  <button type="submit" className="btn btn-primary">Login</button>
  <p className='dont-have-accout'>Don't have an account? <Link to="/register">Register</Link></p>
</form>
 </div>
    
    </>
  )
}

export default LoginForm
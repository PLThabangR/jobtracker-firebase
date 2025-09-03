import React, { useState } from 'react'
import { useUsers } from '../../globalState/usersStore';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';

interface UserRegisterForm{
  id: number;
  name: string;
  email: string;
  password: string;
  
}


const RegisterForm = () => {
  //Hooks and states
  const Navigate = useNavigate();
 const {users , createUser} = useUsers();
  const [newUser, setNewUser] = useState<UserRegisterForm>({
    id: 0,
    name: '',
    email: '',
    password: '',
   
  });

   const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    //Prevent page reload
    e.preventDefault();

    //Validate form fields
    if (!newUser.name || !newUser.email || !newUser.password) {
      return toast.error('All fields are required');
    }

    //Create new user object and remove white spaces
    const createdUser: UserRegisterForm = { 
      id:Number(Math.floor(Math.random() * 1000)),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      password: newUser.password.trim()
    };

    try {
      //Add new user object to the zustand function
      const {success, message} = await createUser(createdUser);

      if (success) {
        toast.success(message);
        Navigate('/login');
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('Failed to create user');
      console.error(error);
    }

    //Clear form fields
    setNewUser({ id: createdUser.id, name: '', email: '', password: '' });
  }
  return (
    <>
<div className='container content'>
  <form onSubmit={handleSubmit }>
  <h1 className='form-header'>Sign up</h1>
  <div className="mb-3">
    <label htmlFor="jobName" className="form-label">Name</label>
    <input type="text" className="form-control" id="jobName" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})}/>

  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="text" className="form-control" id="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
  </div>
  

  <button type="submit" className="btn btn-primary">Register</button>
</form>
</div>
    </>
  )
}

export default RegisterForm
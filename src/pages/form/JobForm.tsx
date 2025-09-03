import { useState } from 'react';
import './form.css'
import { useJobs } from '../../globalState/store';
import toast from 'react-hot-toast';
import { useUsers } from '../../globalState/usersStore';
;
import {Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

interface Job {
  id?: number;
  email: string;
  companyName: string;
  role: string;
  date: string;
  jobStatus: string;
  extraDetails: string;
}

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  
}
const JobForm = () => {
  //Hooks
//import from zustand
  const { jobs,createJob} = useJobs();
  const {users} = useUsers();
  const Navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [extraDetails, setExtraDetails] = useState('');
//get local email to check if user is authenticated
 const [userEmail, setUserEmail] = useState<string>((() => {
    //get email from local storage
    const userEmail = localStorage.getItem('email')
    return userEmail ? userEmail.toString() : ""
  }));


  //Handle submit
  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    //Prevent page reload
    e.preventDefault();
    
    //get email from local storage
    const email = localStorage.getItem('email');
    //find the current user
    const currentUser = users.find((user: User) => user.email === email);

    //Check if current user is null or undefined
    if (!currentUser) {
      toast.error('Current user is null or undefined');
      return;
    }
  
    //conver the emaiol to sring
    const emailString = currentUser.email.toString();
    
    //Create new job object by using keys and removing white spaces
    const newJob: Job = { 
        
         email: emailString.trim(),companyName:companyName.trim(),role: role.trim(), date, jobStatus: jobStatus.trim(), extraDetails: extraDetails.trim() };
      //Add new job object to the zustand function
     // addJob(newJob);
     const {success, message} = await createJob(newJob);

     if(success){
      toast.success(message);
    
     }else{
      toast.error(message);
     }
    //set to empty
    setCompanyName('');
    setRole('');
    setDate('');
    setJobStatus('');
    setExtraDetails('');
     
  }
  return (
    <>
  

<div className='container content' >
  
<form  onSubmit={handleSubmit}>
  <h1 className='no-jobs-header'>Add a new job</h1>
  <div className="mb-3">
    <label htmlFor="companyName" className="form-label">Company name</label>
    <input type="text" className="form-control" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>

  </div>
  <div className="mb-3">
    <label htmlFor="role" className="form-label">Role</label>
    <input type="text" className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
  </div>

  <div className="mb-3">
    <label htmlFor="date" className="form-label">Posted date</label>
    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="jobStatus" className="form-label">Status</label>
    <input type="text" className="form-control" id="jobStatus" value={jobStatus} onChange={(e) => setJobStatus(e.target.value)}/>
  </div>

   <div className="mb-3">
    <label htmlFor="extraDetails" className="form-label">Extra Details</label>
    <input type="text" className="form-control" id="extraDetails" value={extraDetails} onChange={(e) => setExtraDetails(e.target.value)}/>
  </div>

  <button type="submit" className="btn btn-primary">Post job</button>
  <Link to={'/home'}><button type="submit" style={{marginLeft:'1rem'}} className="btn btn-primary">Back</button></Link>
  
</form>
</div>

    
    </>
  )
}

export default JobForm

import './home.css';
import Navbar from '../Navbar/Navbar';
import JobCard from '../../components/JobCard';
import { useJobs } from '../../globalState/store';
import { useEffect, useState } from 'react';
import { useUsers } from '../../globalState/usersStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// interface JobInterface {
//   id: number;
//   email: string;
//   companyName: string;
//   role: string;
//   date: string;
//   jobStatus: string;
//   extraDetails: string;
// }

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
const Home = () => {
  const navigate = useNavigate();
  const {jobs,getAllJobs,searhArray} = useJobs();
  const {users} = useUsers();
  const [userEmail, setUserEmail] = useState<string>((() => {
    //get email from local storage
    const userEmail = localStorage.getItem('email')
    return userEmail ? userEmail.toString() : ""
  }));

  //load function using use effect
  useEffect(() => {
    //get email from local storage
    
    //find the current user
    const currentUser = users.find((user: User) => user.email === userEmail)
    //Check if current user is null or undefined
    if (!currentUser) {
      toast.error('Current user is null or undefined');
      navigate('/login');
      return;
    }
  
  
    setUserEmail(currentUser.email);
    //we can even use redis for storing tokens
  //  localStorage.setItem('email',emailString);
    //Call the get all jobs function
    DisplayJobs(); //Call the get all jobs function
    //Call the get all jobs function search change
    DisplayFilterdJobs()//get seached jobs
 getAllJobs(userEmail); //Call the get all jobs function associated withn this email
  }, [jobs.length,userEmail,searhArray.length>0 ])//dependency array the useffect will only run if the length changes or user ermail changes

  //Maping jobs to card using this functon
  const DisplayJobs=() :any=>{
    if(jobs) {//check if jobs array has values
      return ( //if jobs exits return this error
        
        jobs.map((job) => (
          
          job ? (
            <JobCard key={job.id} id={job.id} email={job.email} companyName={job.companyName} role={job.role} jobStatus={job.jobStatus} date={job.date} extraDetails={job.extraDetails}/>
          ) : null //reutrn null of the is a error with keys
        ))
      );
    }
  }

  //diplay filterd jobs
    const DisplayFilterdJobs=() :any=>{
    if(searhArray) {//check if jobs array has values
      return ( //if jobs exits return this error
        searhArray.map((searchedJob) => (
          searchedJob ? (
            <JobCard key={searchedJob.id} id={searchedJob.id} email={searchedJob.email} companyName={searchedJob.companyName} role={searchedJob.role} jobStatus={searchedJob.jobStatus} date={searchedJob.date} extraDetails={searchedJob.extraDetails}/>
          ) : null //reutrn null of the is a error with keys
        ))
      );
    }
  }
  return (
    <>
    
<Navbar/>
   
{jobs.length > 0 ? <h1 className='no-jobs-header'>Jobs Applied</h1>:<h1 className='no-jobs-header'>No jobs applied</h1> }
    <div className="card-container"  >
  { searhArray.length>0 ? <DisplayFilterdJobs/>:<DisplayJobs/>} 
    </div>

    
    
    </>
  )
}

export default Home
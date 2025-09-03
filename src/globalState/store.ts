
//Importing the create function from zutand
import {create} from 'zustand'
//Importing the create function from zutand
// Import Firebase functions to interact with the database
import { ref, push, get as firebaseGet, child
  , getDatabase,set as firebaseSet, 
  update,
  remove
} from "firebase/database";
//import initialized db instance
import {app}  from "../firebase/firebase";

interface Job {
  id?: string | number;   
  email: string;//email is a property of User as a primary key
  companyName: string;
  role: string;
  date: string;
  jobStatus: string;
  extraDetails: string;
}
//defining the type of our job state
 type JobState = {
  jobs: Job[];//array of jobs
  setJobs: (jobs: Job[]) => void; //function to update our state
  searhArray: Job[];
  createJob: (newJob: Job) => any ;
  getAllJobs: (userEmail: string) => any;
  updateJobStore: (jobId: string | number,updatedJob: Job) => any;
  deleteJob: (jobId: string|number) => any;
  searchByCompanyName: (searchTerm: string) => any;
  
}



//We are defining our custom hook using th create method
export const useJobs = create<JobState>((set,get) => ({//set is a special name allows us to change our value
  //get is also a special value to get our value to scope uin arrow function
    jobs: [], //initial value\
    searhArray: [],//initial value fro searched array
    //function to update out state
   setJobs: (jobs: Job[]) => set({jobs}),
//This function returns a promise of an object
  createJob:async (newJob: Job): Promise<{success: boolean, message: string}> => {
   try{
    //Check if all fields are filled from user
    if(!newJob.email || !newJob.companyName || !newJob.role || !newJob.date || !newJob.jobStatus || !newJob.extraDetails){
        return {success: false, message: 'All fields are required'};
    }
    
    // get instance of database
    const db = getDatabase(app);
 //push data to firebase
    const jobRef = ref(db, 'jobs');
 
    // push new user to users table
    const data = await push(jobRef, {id: jobRef.key, ...newJob});
    
    // GExtract key
    const id = data.key;
   

  // Save job with the generated ID
await firebaseSet(data, { id, ...newJob });
    //save job with key to the state
     const jobWithId = { id: id, ...newJob };
  if(data){
   
      //Update the state
    // Key return a objec
  set((state) => ({ jobs: [...state.jobs, jobWithId] }))

    
    //Return the data
    return {success: true, message: "Job created successful"};
  }

   }catch(err){
    //Return this to user if somethi
      return {success: false, message: "Job not created "};
   }
  }//end of createJob

  //get all jobs function
  ,getAllJobs: async (userEmail: string): Promise<{success: boolean, message: string}> => {
         //get instance of database
      const db = getDatabase(app);
          //get users for firestore
      const response =  ref(db, 'jobs');
        //get users from db and store in the snapshot
      const snapshot = await firebaseGet(response);
       //Check if user exists
        if (!snapshot.exists()) {
          return {success: false, message: 'No jobs found'};
        }


      //Parse the response to javascript json object
       const data = await snapshot.val()
        //Check if data exists then run the code
       if(data){
//convert object to array
          const usersArray = Object.values(data);
         

          //get jobs for the user with the same email
       const Userjobs = usersArray.filter((job: Job) => job.email === userEmail);
      //we do not use set ... because we are not updating the state
    set({jobs: Userjobs as Job[]});
       return {success: true, message: 'Jobs fetched successfully'};

       }else{

        return {success: false, message: 'No jobs found'};
       }

          
       
   
  },
  //end of getAllJobs
  //Start of Delete job function

  deleteJob: async (id:string|number): Promise<{success: boolean, message: string}> => {
    console.log("Delete job id ",id);
   try{
    //Check if id is null or undefined
     if(!id){
       throw new Error("Id is null or undefined");
     }
     //Make a delete request to the backend to delete job
     //get instance of database
     const db = getDatabase(app);
    // remover job from db
     const jobref = ref(db, `jobs/${id}`);

        try{
     // remover job from db
     await remove(jobref);
   }catch(err){
    throw new Error("Failed to delete job");
   }

   
    //Update the state
    const jobs = get().jobs;

    console.log(jobs);
    if(!jobs){
      throw new Error("Jobs is null or undefined");
    }
    //Use filter to remove the job with the same id and set the state
    set((state) => ({ jobs: state.jobs.filter((job) => job.id !== id) }));
    //Return the data
    return {success: true, message: "Job deleted successful"};
   }catch(err){
    //Return this to user if something goes wrong
    console.log(err)
      return {success: false, message: "Job not deleted "};
   }
  }//End of deleteJob function

  //update job start here
  ,updateJobStore: async (id: number,updatedJob: Job): Promise<{success: boolean, message: string}> => {
    
    
    if(!updatedJob.companyName || !updatedJob.role || !updatedJob.date || !updatedJob.jobStatus || !updatedJob.extraDetails){
        return {success: false, message: 'All fields are required'};
    }
    if(!updatedJob.companyName.trim() && updatedJob.companyName.length<2){
      return {success: false, message: 'Company name is too short'};
    }
    if(!updatedJob.role.trim() && updatedJob.role.length<2){
      return {success: false, message: 'Role is too short'};
    }
    if(!updatedJob.extraDetails.trim() && updatedJob.extraDetails.length<3){
      return {success: false, message: 'Extra details is too short'};
    }
   try{
     //Make a put request to the backend to update job
     //get instance of database
     const db = getDatabase(app);

     //update job in db
     const job = ref(db, `jobs/${id}`);
     await update(job, updatedJob);

    //Update the state
    //Use map to update the job with the same id and set the state
    set((state) => ({ jobs: state.jobs.map((job) => job.id === id ? {...job, ...updatedJob} : job) }));
    //Return the data
    return {success: true, message: "Job updated successful"};
   }catch(err){
    //Return this to user if something goes wrong
      return {success: false, message: "Job not updated "};
   }
  },//end of updateJob
// Set the state of job to the filtered jobs this will render
  searchByCompanyName : (searchTerm:string)=>{
    //variable to store the filtered jobs
    let  filteredJobs: Job[] = [];
    //get the state of this component
    //becuase we are using  arrow function they do not have access to this method
    const {searhArray,jobs} = get();
    if(searchTerm.length>0){//if the search term is empty return all jobs
       filteredJobs = jobs.filter((job: Job) => job.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
       set({searhArray: filteredJobs});
    }else{
      set({searhArray:[]});
    }
  
  },

}))
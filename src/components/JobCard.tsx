import toast from 'react-hot-toast';
import { useJobs } from '../globalState/store';
import './JobCard.css';

import {  useState } from 'react';

interface JobCardProps {
   id?: number | string  
  email: string;
  companyName: string;
  role: string;
  date: string;
  jobStatus: string;
  extraDetails: string;
}

const JobCard = (job: JobCardProps) => {
  const [jobDetails, setJobDetails] = useState<JobCardProps>(job);
  // Destructure the props
  const { id, email, companyName, role, date, jobStatus, extraDetails } = jobDetails;
  const { deleteJob ,updateJobStore} = useJobs();
//control the modal 
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number|string) => {

    if (!id) {
      toast.error('ID is null or undefined');
      return;
    }

    const { success, message } = await deleteJob(id);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

   const openModal = () => {

 setIsModalOpen(true); // open modal after state is set
   };

   const handleUpdate =async (id: number,updatedJob:JobCardProps) => {
      
      
      const {success, message} =  await updateJobStore(id,updatedJob);
      if(success){
        toast.success(message);
       
      }else{
        toast.error(message);
        //clear state if the is error occored
       
      }

    }


  return (
    <>
      <div
        className="card"
        style={{ width: '20rem', marginTop: '10px', marginBottom: '10px' }}
      >
        <div className="card-body">
         
          <h5 className="card-title">{companyName}</h5>
          <h6 className="card-title">{role}</h6>
          <p className="card-text">{date}</p>
          <p className="card-text">{jobStatus}</p>
          <p className="card-text">{extraDetails}</p>

          <button
            className="btn btn-primary"
            onClick={openModal}
            
          >
            Update
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal start here */}
     {isModalOpen && (
       <div className="modal show d-block" tabIndex={-1}>
      
           <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        
        <h5 className="modal-title" style={{textAlign:'center'}}>Update job informaton</h5>
        <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
      </div>
      <div className="modal-body">
       <form>
  <div className="mb-3">
    <label htmlFor="companyName" className="form-label">Company name</label>
    <input type="text" className="form-control" id="companyName" value={jobDetails.companyName} onChange={(e) => setJobDetails({...jobDetails, companyName: e.target.value})}/>

  </div>
  <div className="mb-3">
    <label htmlFor="role" className="form-label">Role</label>
    <input type="text" className="form-control" id="role" value={jobDetails.role} onChange={(e) => setJobDetails({...jobDetails, role: e.target.value})} />
  </div>

  <div className="mb-3">
    <label htmlFor="date" className="form-label">Posted date</label>
    <input type="date" className="form-control" id="date" value={jobDetails.date} onChange={(e) => setJobDetails({...jobDetails, date: e.target.value})}/>
  </div>
  <div className="mb-3">
    <label htmlFor="jobStatus" className="form-label">Status</label>
    <input type="text" className="form-control" id="jobStatus" value={jobDetails.jobStatus} onChange={(e) => setJobDetails({...jobDetails, jobStatus: e.target.value})}/>
  </div>

   <div className="mb-3">
    <label htmlFor="extraDetails" className="form-label">Extra Details</label>
    <input type="text" className="form-control" id="extraDetails" value={jobDetails.extraDetails} onChange={(e) => setJobDetails({...jobDetails, extraDetails: e.target.value})}/>
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary"  onClick={() => setIsModalOpen(false)}>Close</button>
        {/* this button open and closes the modal */}
        <button type="button" className="btn btn-primary" onClick={() => handleUpdate(jobDetails.id,jobDetails)} >Save changes</button>
      </div>
    </div>
  </div>
      </div>
     )}
    </>
  );
};

export default JobCard;

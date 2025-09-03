
import toast from 'react-hot-toast';
import { useJobs } from '../globalState/store';
import { useState } from 'react';

interface JobModalProps {
 id: number;
  email: string;//email is a property of User as a primary key
  companyName: string;
  role: string;
  date: string;
  jobStatus: string;
  extraDetails: string;
}

const ModalForm = ({id,companyName,email, role, date, jobStatus, extraDetails}: JobModalProps) => {

    const [updateJob, setUpdateJob] = useState<JobModalProps>({id,email,companyName, role, date, jobStatus, extraDetails});
    
    const {updateJobStore} = useJobs();
    const handleUpdate =async () => {
      
      const {success, message} =  await updateJobStore(id,updateJob);
      if(success){
        toast.success(message);
       
      }else{
        toast.error(message);
        //clear state if the is error occored
        setUpdateJob({id,email:email,companyName:"", role:"", date:"", jobStatus:"", extraDetails:""});
      }

    }
  return (
    <div >
     <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1>{id}</h1>
        <h5 className="modal-title" style={{textAlign:'center'}}>Update job informaton</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <form>
  <div className="mb-3">
    <label htmlFor="companyName" className="form-label">Company name</label>
    <input type="text" className="form-control" id="companyName" value={updateJob.companyName} onChange={(e) => setUpdateJob({...updateJob, companyName: e.target.value})}/>

  </div>
  <div className="mb-3">
    <label htmlFor="role" className="form-label">Role</label>
    <input type="text" className="form-control" id="role" value={updateJob.role} onChange={(e) => setUpdateJob({...updateJob, role: e.target.value})} />
  </div>

  <div className="mb-3">
    <label htmlFor="date" className="form-label">Posted date</label>
    <input type="date" className="form-control" id="date" value={updateJob.date} onChange={(e) => setUpdateJob({...updateJob, date: e.target.value})}/>
  </div>
  <div className="mb-3">
    <label htmlFor="jobStatus" className="form-label">Status</label>
    <input type="text" className="form-control" id="jobStatus" value={updateJob.jobStatus} onChange={(e) => setUpdateJob({...updateJob, jobStatus: e.target.value})}/>
  </div>

   <div className="mb-3">
    <label htmlFor="extraDetails" className="form-label">Extra Details</label>
    <input type="text" className="form-control" id="extraDetails" value={updateJob.extraDetails} onChange={(e) => setUpdateJob({...updateJob, extraDetails: e.target.value})}/>
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* this button open and closes the modal */}
        <button type="button" className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default ModalForm
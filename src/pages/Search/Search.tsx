import { useEffect, useState } from "react";
import { useJobs } from "../../globalState/store";



// interface JobInterface {
//   id: number;
//   companyName: string;
//   role: string;
//   date: string;
//   jobStatus: string;
//   extraDetails: string;
// }
const Search = () => {
  const {searchByCompanyName} = useJobs();
//const [jobs ,getAllJobs] = useJobs();
  //Hooks
  const [search, setSearch] = useState('');
  //array of jobs 
//  const [searchResults, setSearchResults] = useState<JobInterface[]>([]);

useEffect(() => {
  
  //  setSearch(search);
   // let this function run as the seach changes
//  handleSearch(event); 
}, [search]); 

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    //const {jobs,getAllJobs} = useJobs();
  //Use the filter method
  // const filteredJobs = jobs.filter((job: JobInterface) => job.companyName.toLowerCase().includes(search.toLowerCase()));
   // setSearchResults(filteredJobs);
   //Use the searchByCompanyName function from the useJobs hook
   //pass the seached term to the search  Job function
  //  if( search === ''){
  //    return toast.error('Search term is too short');
     
  //  }
   const trimmed = search.trim();
  searchByCompanyName(trimmed);


  
 


}
  return (
    <div>

         <form className="d-flex" >
        <input className="form-control me-2" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for jobs" aria-label="Search"/>
        <button className="btn btn-outline-success" onClick={(e) => handleSearch(e)}>Search</button>
      </form>
     
    
    </div>
  )
}

export default Search

//Importing the create function from zutand
// Import Firebase functions to interact with the database
import { ref, push, get as firebaseGet, child
  , getDatabase,set as firebaseSet 
} from "firebase/database";
//import initialized db instance
import {app}  from "../firebase/firebase";
import {create} from 'zustand'

/**
 * ref - reference to a specific location in the database
 * push - add new data to the database
 * get - get data from the database
 * child - child of a specific location in the database
 * 
*/

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  
}
//defining the type of our state
 type UsersState = {
  users: User[];
  createUser: (newJob: User) => any ;
  getAllUsers: (email: string,password: string) => any;
  
}



//We are defining our custom hook using th create method
export const useUsers = create<UsersState>((set,get) => ({//set is a special name allows us to change our value
    users: [], //initial value
    //function to update out state
  
   setUsers: (users: User[]) => set({users}),

  createUser:async (newUser: User): Promise<{success: boolean, message: string}> => {
   try{
    //Check if all fields are filled from user
    

    if(!newUser.name || !newUser.password || !newUser.email){
        return {success: false, message: 'All fields are required'};
    }

    if (newUser.name.length<2){
      return {success: false, message: 'Name is too short'};
    }

    if(newUser.email.length<5){
      return {success: false, message: 'Email is too short'};
    }

    if( newUser.password.length<4){
      return {success: false, message: 'Password is too short'};
    }
    //Get state variable to check if user exist
    //Get is a special keyword for zustand
     const {users} = get();

          //check if email and password are correct using the find method to search 
    const user =users.find((user: User) => user.email === newUser.email)

    //if user exist return this to user
    if(user){
       return {success: false, message:"The user already exist"}
    }
    
    
   // get instance of database
    const db = getDatabase(app);
 //create table with users name
    const usersRef = ref(db, 'users');
    // push new user to users table
    const data = await push(usersRef, newUser)
    console.log("data ...",data)
   
    //Update the state
  set((state) => ({ users: [...state.users, {id: data.key, ...newUser}] }))
    //Return the data
    return {success: true, message: "User created successful"};

   }catch(err){
    //Return this to user if somethi
    console.log(err)
      return {success: false, message: "User not created "};
   }
  },//end of createJob

  //get all jobs function
  getAllUsers : async (email: string,password: string) => {
     
  
    try {
      //get instance of database
      const db = getDatabase(app);
          //get users for firestore
      const response =  ref(db, 'users');
        //get users from db and store in the snapshot
      const snapshot = await firebaseGet(response);
      
      //Check if user exists
      if (!snapshot.exists()) {
        return {success: false, message: 'No users found'};
      }

      //Parse the response to javascript json object
       const data = await snapshot.val()

     

       
          //convert object to array
          const usersArray = Object.values(data);
          
        //we do not use set ... because we are not updating the state
          set({users: usersArray as User[]});
        

      
    //check if email and password are correct
        //check if email and password are correct using the find method to search 
    const user =usersArray.find((user: User) => user.email === email && user.password === password);
      
  
    if (!user) {
      return {success: false, message: 'Invalid email or password'};
    }

 
    //Return the data 
    return {success: true, message: 'Login successfully'};
      
    } catch (error) {
          return {success: false, message: 'Failed to login'};
    }

  }

}))
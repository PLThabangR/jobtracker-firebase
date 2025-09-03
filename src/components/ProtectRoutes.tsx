import React, { use, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'


interface ProtectRoutesProps {
    children: React.ReactNode
}
const ProtectRoutes = ({children}:ProtectRoutesProps) => {
  const [isAuthenticated] = useState<string>((() => {
     //get email from local storage
     const userToken = localStorage.getItem('token')
     return userToken ? userToken.toString() : ""
   }));
    //check for token in the local storage
//const isAuthenticated = localStorage.getItem('token')
  if (!isAuthenticated) {
    toast.error('You are not logged in');
    //redirect to login
    return <Navigate to="/login" />
  }




  
    return (
    <div>
        {/* This is where the children will be rendered components wraaped inside */}
{children}



    </div>
  )
}

export default ProtectRoutes
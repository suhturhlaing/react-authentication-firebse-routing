import React from 'react'
import { Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"


function PrivateRoute({props:any}) {

  const {currentUser} = useAuth();
  return (
   
        currentUser ? <Outlet /> : <Navigate to= "/login" />
    
  )
}

export default PrivateRoute
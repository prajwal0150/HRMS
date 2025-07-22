import {Navigate} from 'react-router-dom';
import React from 'react';
import Unauthorize from './Unauthorize';


export default function ProtectedRoute({children, allowedRoles=[]}) {
    const token =localStorage.getItem("token");

    const userRaw= localStorage.getItem("user");
    const user =userRaw ? JSON.parse(userRaw) : null;

    if (!token){
        return <Navigate to="/"/>;

    }
    if(allowedRoles.length> 0 && !allowedRoles.includes(user.role)){
        return <Unauthorize/>;
    }
    return children;;
}

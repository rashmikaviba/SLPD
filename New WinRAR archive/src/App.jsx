import {BrowserRouter, Routes , Route} from 'react-router-dom'

import SessionService from "./shared/masterData.service";
import { useEffect, useState } from "react";
import axios from "axios";
import DriverLayout from "./layouts/DriverLayout";
import AdminLayout from "./layouts/AdminLayout";



export default function App() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const token = SessionService.get("token");

  axios.defaults.baseURL = "http://localhost:3000/api";

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const userId = SessionService.get("userId");
    const role = SessionService.get("role");
    setUserId(userId);
    setRole(role);
  }, [setUserId, setRole]);

  return (
    <BrowserRouter>
    
      {role == "Admin" && userId != null ? (
        <>
          <AdminLayout />
        </>
      ) 
      : (
        
        <>

          <DriverLayout />
          
        </>
      )}
      
    </BrowserRouter>
  );
}

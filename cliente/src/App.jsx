import { useState } from 'react';
import GlobalStyle from "./styles/global";
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from './routes';

function App() {

  return (
   <>
     <Router/>
     <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
     <GlobalStyle/>
    </>
  )

  
}

export default App

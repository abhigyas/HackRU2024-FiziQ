import {createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import React from 'react'
//pages
import Signup from "./pages/Signup.jsx";
import Home from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import WorkoutsPage from "./pages/WorkoutsPage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Landing Page */}
      <Route index element={<Signup/>}/>

      {/* Path for all pages in app */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/workouts" element={<WorkoutsPage/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
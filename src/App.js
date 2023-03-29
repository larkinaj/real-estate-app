import React, { useState, Component, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import OpenStreetMap from "./components/postings/openstreetmap";
import Mapbox  from "./components/postings/mapbox";
import NotFound from "./components/not-found";
import PurchaseAgreeFill from "./components/purchase-agreement-fill";
import LoginPage from "./components/login-signup/login"
import Protected from "./components/user/protected";
import Profile from "./components/user/profile";
import './App.css';

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState('pending');
  const [ currentUser, setCurrentUser ] = useState({username: '', userID: ''})
  
  useEffect(() => {
    console.log('useEffect in App ')
    fetch('http://localhost:3000/verify')
    .then((res)=>res.json())
    .then((data)=>{
      console.log('Here is App.js')
      console.log(data)
      if (data.authenticated) {
        setCurrentUser({username: data.username, userID: data.userID})
        setIsAuthenticated(true)
      } else if (!data.authenticated) {
        setIsAuthenticated(false)
      }
      console.log('useEffect in App: ', data)
    })
  }, [isAuthenticated])

  if (isAuthenticated === 'pending') {
    return (
      <div className="router">
        <h1>LOADING PAGE</h1>
      </div>
    )
  }
  else if (isAuthenticated) {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route
              exact path="/"
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile currentUser={currentUser}/>
              }
            />
            <Route
              path="/profile/create"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/profile/documents/:id"
              element={
                <PurchaseAgreeFill 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              exact path="/open-street"
              element={<OpenStreetMap />}
            />
            <Route 
              exact path='/login'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  }
  else if (!isAuthenticated) {
    return (
      <div className="router">
        <main>
          <Routes>
            <Route 
              exact path='/'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                />}
            />
            <Route 
              exact path='/login'
              element={
                <LoginPage 
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route 
              exact path='*'
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    )
  }
}

export default App;

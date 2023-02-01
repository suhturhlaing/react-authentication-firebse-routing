import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import ForgotPassword from "../components/ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (
   
      <Container className="d-flex align-items-center justify-content-center" style={ {minHeight : "100vh"}}>
        <div className="w-100" style={{ maxWidth : "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/update-profile" element={<UpdateProfile />} />
                </Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
    
  );
}

export default App;

import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons'

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const [normalEye, setNormalEye] = useState(true);

  const { login } = useAuth();

  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(passwordType==="password"){
      setPasswordType("text");
      setNormalEye(false);
      return;
    }
    else{
      setPasswordType("password");
      setNormalEye(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try{
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/")
    }
    catch{
      setError("Failed to login.")
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>

            {/* for email field */}
            <Form.Group id="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>

            {/* for password field */}
            <Form.Group id="password">
              <Form.Label>
                Password
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={passwordType} ref={passwordRef} required/>
                  <InputGroup.Text id="basic-addon3" onClick={showHide}> {normalEye !== true ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />} </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            {/* <Form.Group id="password">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group> */}

            <Button disabled={loading} className='w-100 mt-4' type="submit"> Log In</Button>
            <div className='w-100 text-center mt-3'>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link> 
      </div>
    </div>
  )
}

export default Login
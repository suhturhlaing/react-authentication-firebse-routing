import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons'


function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [normalEye, setNormalEye] = useState(true);
  const [confirmEye, setConfirmEye] = useState(false);

  const { signup } = useAuth();

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

  const showHideConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(confirmPasswordType==="password"){
      setConfirmPasswordType("text");
      setConfirmEye(true);
      return;
    }
    else{
      setConfirmPasswordType("password");
      setConfirmEye(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("Passwords do not match")
    }
    try{
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    }
    catch{
      setError("Failed to create an account!")
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Sign Up</h2>
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

            {/* confirmation password field */}
            <Form.Group id="password-confirm">
              <Form.Label>
                Password Confirmation
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={confirmPasswordType} ref={passwordConfirmRef} required/>
                  <InputGroup.Text id="basic-addon1" onClick={showHideConfirm}> {confirmEye === true ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />} </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type="submit"> Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Log In</Link> 
      </div>
    </div>
  )
}

export default SignUp
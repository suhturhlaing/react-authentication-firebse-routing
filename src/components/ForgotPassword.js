import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link} from "react-router-dom"

function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try{
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions")
    }
    catch{
      setError("Failed to Reset Password.")
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Password Reset</h2>
          {message && <Alert varient="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>

            {/* for email field */}
            <Form.Group id="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-4' type="submit"> Reset Password</Button>
            <div className='w-100 text-center mt-3'>
              <Link to="/login">Login</Link>
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

export default ForgotPassword
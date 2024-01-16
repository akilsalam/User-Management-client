import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const emailRef=useRef()
  const passwordRef=useRef()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server endpoint that validates the login
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          if(emailRef.current.value===email&&passwordRef.current.value===password){
            localStorage.setItem("emailData",email)
            localStorage.setItem("passwordData",password)
          }
          navigate(data.redirectUrl);
          window.location.reload();
        } else {
          setErrorMessage(data.message || 'User Name Not Found!!🧐');
        }
      } else {
        console.error('Invalid credentials');
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='text-center text-white m-5'>Log In</h1>
      {errorMessage && <Alert className='text-center text-danger m-5' variant="danger">{errorMessage}</Alert>}
    <Form className='m-5' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className=" text-secondary">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Link to={'/signup'}>Create new Account</Link>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default LoginSection;

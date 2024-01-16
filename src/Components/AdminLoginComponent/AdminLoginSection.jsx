import React, { useState,useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminLoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef=useRef()
  const passwordRef=useRef()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/login', {
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
            localStorage.setItem("adminEmailData",email)
            localStorage.setItem("adminPasswordData",password)
          }
          // Redirect to the specified URL
          navigate(data.redirectUrl);
          window.location.reload();
        } else {
          // Display error message from the server
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
          <div>
      <h1 className='text-center text-white m-5'>Admin Panel</h1>
      {errorMessage && <Alert className='text-center text-danger m-5' variant="danger">{errorMessage}</Alert>}
    <Form className='m-5' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='text-white'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} ref={emailRef} onChange={(e) => setEmail(e.target.value)} />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='text-white'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} ref={passwordRef} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
  );
}

export default AdminLoginSection;

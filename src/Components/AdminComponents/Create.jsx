import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstData: firstName,
          lastData: lastName,
          emailData: email,
          passwordData: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Redirect to the specified URL
          navigate(data.redirectUrl);
        } else {
          // Display error message from the server
          setErrorMessage(data.message || 'Registration failed');
        }
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
        <h1 className='text-center text-white m-4'>Create User</h1>
        {errorMessage && <Alert className='text-center text-danger m-5' variant="danger">{errorMessage}</Alert>}
          <Form className='m-5 '  onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Form.Label className='text-white'>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={(e)=> setFirstName(e.target.value)}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label className='text-white'>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={(e)=> setLastName(e.target.value)}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustomUsername">
          <Form.Label className='text-white'>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e)=> setEmail(e.target.value)}
              />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
                <Form.Group controlId="validationCustom02">
          <Form.Label className='text-white'>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
            />
          <Form.Control.Feedback type="invalid">You must create a strong password</Form.Control.Feedback>
        </Form.Group>
        <br />
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  );
}

export default Create;

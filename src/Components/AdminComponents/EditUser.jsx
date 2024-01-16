import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  let url = window.location.href;
  url = url.split('/');
  const userId = url[url.length - 1];

  useEffect(() => {
    // Fetch user data based on the userId from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/edit-user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
            setFirstName(userData.first_name)
            setLastName(userData.last_name)
            setEmail(userData.email)
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/admin/edit-user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstData: firstName,
          lastData: lastName,
          emailData: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Handle success, e.g., redirect to another page
          navigate(data.redirectUrl)
        } else {
          setErrorMessage(data.message || 'Update failed');
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
      <h1 className='m-5 text-center text-white'>Edit User</h1>
      {errorMessage && <Alert className='text-center text-danger m-5' variant="danger">{errorMessage}</Alert>}
      <div className='m-5' style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <div className='w-50 border bg-secondary text-white p-5'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">FirstName:</label>
              <input
                type="text"
                name='lastName'
                className='form-control'
                placeholder='Enter firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">LastName:</label>
              <input
                type="text"
                name='firstName'
                className='form-control'
                placeholder='Enter lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name='email'
                className='form-control'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <button  type="submit" className='btn btn-info'>
                 Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

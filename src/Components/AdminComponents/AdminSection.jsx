import React, { useEffect, useState } from 'react';
import { Table,Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import './Admin.css'

const AdminSection = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data from the server
    fetch('http://localhost:3000/admin')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/delete/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const confirmation = window.confirm('Are you sure about delete the data ?')
          if(confirmation){
            navigate(data.redirectedUrl);
          }
        } else {
          console.error('Failed to delete user:', data.error || 'Unknown error');
        }
      } else {
      }
      const errorData = await response.json(); // Log the error response

      console.error('Failed to delete user:', 'Server returned an error', errorData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div>
      <h1 className='text-center text-white m-5'>User Datas</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button className='mb-5' variant="primary"><Link className='text-white' style={{textDecoration:'none'}} to={'/create-user'}>Create User</Link></Button>{' '}
      </div>
      <Table striped hover variant='dark'>
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index=0) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>              
              <MyContext.Provider data={{fname:users}}>
                <td><button className='btn btn-outline-info text-white' ><Link className='text-white' style={{textDecoration:'none'}} to={`/editUser/${user._id}`} data={user.first_name}>Edit</Link></button>{' '}
              <button className='btn btn-outline-danger text-white' onClick={() => handleDelete(user._id)}><a className='text-white' style={{textDecoration:'none'}} href='/admin'>Delete</a></button>{' '} </td>
              </MyContext.Provider>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
const MyContext = React.createContext();
console.log(MyContext);
export default AdminSection;
export {MyContext}
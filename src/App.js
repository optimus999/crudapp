import React, { useState, useEffect } from 'react';
import './App.css';
import Edit from './components/Edit';
import Delete from './components/Delete';

const initialFormData = {
  name: '',
  email: '',
  phone: ''
};

const App = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    return storedUsers || {};
  });
  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false); // State to control the form display

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { id: Date.now(), ...formData };
    setUsers({ ...users, [formData.email]: newUser });
    setFormData(initialFormData);
    setShowForm(false); // Close the form after submission
  };

  const handleEdit = (email) => {
    const userToEdit = users[email];
    setFormData(userToEdit);
    setShowForm(true); // Open the form for editing
  };

  const handleUpdate = () => {
    const updatedUsers = { ...users };
    updatedUsers[formData.email] = formData;
    setUsers(updatedUsers);
    setFormData(initialFormData);
    setShowForm(false); // Close the form after updating
  };

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = { ...users };
      delete updatedUsers[email];
      setUsers(updatedUsers);
    }
  };

  const filteredUsers = Object.values(users).filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{backgroundColor:'pink',border:"1px solid black"}}>
      <h1>User Management App</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Edit onClick={() => handleEdit(user.email)} />
                <Delete onClick={() => handleDelete(user.email)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{marginLeft:"21rem" , marginTop:"2rem"}} onClick={() => setShowForm(true)}>Add User</button>
      {showForm && (
        <div className="form-container"  >
          <form onSubmit={handleSubmit} className="user-form">
            <h2 >{formData.id ? 'Edit User' : 'Add User'}</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!!formData.id}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              
            />
            <div className="buttons">
              <button type="submit">{formData.id ? 'Update' : 'Add'}</button>
              {formData.id && (
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;

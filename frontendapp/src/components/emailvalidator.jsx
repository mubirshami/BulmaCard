import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

function EmailValidator() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setValidationError('Invalid email address');
      return;
    }
    setValidationError('');
    const data = { firstName, lastName, email, image};

    try {
      const response = await axios.post('http://localhost:3000/users/', data);
      setApiResponse(response.data);
    } catch (error) {
      console.error('Error sending data to the API:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="text"
              className={`input ${validationError ? 'is-danger' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {validationError && (
              <p className="help is-danger">{validationError}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {apiResponse && (
        <div className="card">
          <div className="card-content">
            <p className="title is-4">
              {apiResponse.fullName} 
            </p>
            <p className="subtitle is-6">{apiResponse.email}</p>
            <figure className="image is-128x128">
              <img src={apiResponse.image} alt="User" />
            </figure>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailValidator;

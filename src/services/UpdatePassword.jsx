// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {useAuth} from '../hooks/useAuth';

const UpdatePasswordForm = () => {
  const { updatePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
  
    console.log('Payload:', { oldPassword, newPassword, confirmPassword }); // Debugging
  
    try {
      await updatePassword(oldPassword, newPassword, confirmPassword);
      setSuccess('Password updated successfully.');
      setError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error:', err.response?.data); // Debugging
      setError(err.response?.data?.message || 'An error occurred while updating the password.');
      setSuccess('');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Current Password"
        className="w-full p-2 border rounded"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 border rounded"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full p-2 border rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        className="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800 border-none"
      >
        Update Password
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
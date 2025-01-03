// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from 'lucide-react';

const UpdateProfileForm = ({ user }) => {
  const { updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.firstname + ' ' + user?.lastname || 'No name set',
    email: user?.email || 'No email set',
  });

  const handleCancel = () => {
    // Reset userData to its original state
    setUserData({
      name: user?.firstname + ' ' + user?.lastname || 'No name set',
      email: user?.email || 'No email set',
    });
    setIsEditing(false); // Exit edit mode
  };

  // Update userData when user data changes
  useEffect(() => {
    if (user) {
      // Concatenate firstname and lastname if they exist
      const fullName = user.firstname && user.lastname
        ? `${user.firstname} ${user.lastname}`
        : 'No name set';

      setUserData({
        name: fullName,
        email: user.email || 'No email set',
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    // Save the updated userData to the backend
    try {
      const response = await updateProfile(userData); // Assign the response
      console.log('Profile updated successfully:', response.data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error.response?.data);
    }
  };

  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
      <div className="flex items-center">
        <User className="mr-2" />
        <span>Edit Profile</span>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave} className="flex-1 ml-4">
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button type="submit" className="border-none bg-orange-700 text-white px-4 py-2 mr-2 rounded hover:bg-orange-800">
            Save
          </button>
          <button
            type="button" // Use type="button" to prevent form submission
            onClick={handleCancel}
            className="border-none bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="border-orange-700 bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
        >
          Edit
        </button>
      )}
    </li>
  );
};

export default UpdateProfileForm;
import { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UpdatePasswordForm from '@/services/UpdatePassword';

const BACKEND_BASE_URL = 'http://localhost:8000'; // Adjust the base URL if needed

export default function Profile() {
  const { user, updateProfile, signOut, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    profile_picture: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        firstname: user.firstname || 'No name set',
        lastname: user.lastname || 'No name set',
        email: user.email || 'No email set',
        profile_picture: user.profile_picture
          ? `${BACKEND_BASE_URL}${user.profile_picture}` // Prepend the backend URL
          : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Fallback to a placeholder
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', userData.firstname);
    formData.append('lastname', userData.lastname);
    formData.append('email', userData.email);
    if (userData.profile_picture instanceof File) {
      formData.append('profile_picture', userData.profile_picture); // Append the file
    }

    console.log('FormData keys:', Array.from(formData.keys())); // Debugging
    console.log('FormData entries:', Array.from(formData.entries())); // Debugging

    try {
      const response = await updateProfile(formData); // Send FormData
      if (response) {
        const updatedProfilePicture = response.profile_picture
          ? `${BACKEND_BASE_URL}${response.profile_picture}` // Prepend the backend URL
          : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'; // Fallback to a placeholder

        setUserData({
          firstname: response.firstname,
          lastname: response.lastname,
          email: response.email,
          profile_picture: updatedProfilePicture,
        });

        if (updateUser) {
          updateUser({
            ...response,
            profile_picture: updatedProfilePicture,
          });
        }

        setImagePreview(null); // Clear the image preview after saving
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserData((prev) => ({ ...prev, profile_picture: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setUserData({
      firstname: user?.firstname || 'No name set',
      lastname: user?.lastname || 'No name set',
      email: user?.email || 'No email set',
      profile_picture: user?.profile_picture
        ? `${BACKEND_BASE_URL}${user.profile_picture}` // Prepend the backend URL
        : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Fallback to a placeholder
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    signOut();
    window.location.href = '/login';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-gray-100 shadow rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <img
            src={
              imagePreview || // Use the preview if available
              userData.profile_picture || // Use the stored profile picture URL or fallback
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' // Fallback to a placeholder
            }
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'; // Fallback to a placeholder
            }}
          />
          <div>
            <h2 className="text-xl font-semibold">
              <span>{userData.firstname}</span> <span>{userData.lastname}</span>
            </h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <UpdatePasswordForm />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
              <div className="flex items-center">
                <User className="mr-2" />
                <span>Edit Profile</span>
              </div>
              {isEditing ? (
                <form onSubmit={handleSave} className="flex-1 ml-4">
                  <input
                    type="text"
                    value={userData.firstname}
                    onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={userData.lastname}
                    onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Last Name"
                  />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Email"
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full p-2 border rounded mb-2 bg-white"
                  />
                  <button
                    type="submit"
                    className="border-none bg-orange-700 text-white px-4 py-2 mr-2 rounded hover:bg-orange-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
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

            <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded text-red-500">
              <div className="flex items-center">
                <LogOut className="mr-2" />
                <span>Logout</span>
              </div>
              <button
                onClick={handleLogout}
                className="border-orange-700 bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
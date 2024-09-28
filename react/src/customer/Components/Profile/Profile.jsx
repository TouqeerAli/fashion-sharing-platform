import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Camera, MapPin, Calendar, Home, ShoppingBag, Eye } from 'lucide-react';

import { fetchUserInfo, fetchRentOuts, setActiveTab } from '../../../Redux/Customers/Profile/Action';

const Profile = () => {
  const dispatch = useDispatch();
  const { activeTab, userInfo, rentOuts, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchRentOuts());
  }, [dispatch]);

  const renderUserInfo = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <User className="mr-2" />
        User Information
      </h2>
      {userInfo && (
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
          <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
          <p><span className="font-semibold">Contact:</span> {userInfo.contact}</p>
        </div>
      )}
    </div>
  );

  const handleViewDetails = (itemId) => {
    console.log(`View details for item ${itemId}`);
  };

  const renderRentOuts = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Rent Outs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Item Name</th>
              <th className="py-3 px-4 text-left">Brand</th>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Rental Price</th>
              <th className="py-3 px-4 text-left">Available From</th>
              <th className="py-3 px-4 text-left">Available To</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentOuts.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{item.itemName}</td>
                <td className="py-3 px-4">{item.brand}</td>
                <td className="py-3 px-4">{item.size}</td>
                <td className="py-3 px-4">${item.rentalPrice}</td>
                <td className="py-3 px-4">{item.availableFrom}</td>
                <td className="py-3 px-4">{item.availableTo}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="mr-2" size={16} />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    switch (activeTab) {
      case 'userInfo':
        return renderUserInfo();
      case 'rentOuts':
        return renderRentOuts();
      default:
        return <p className="text-center">Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <ul>
            <li 
              className={`mb-2 p-2 rounded cursor-pointer ${activeTab === 'userInfo' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => dispatch(setActiveTab('userInfo'))}
            >
              <User className="inline-block mr-2" size={18} />
              User Info
            </li>
            <li 
              className={`mb-2 p-2 rounded cursor-pointer ${activeTab === 'rentOuts' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => dispatch(setActiveTab('rentOuts'))}
            >
              <ShoppingBag className="inline-block mr-2" size={18} />
              Rent Outs
            </li>
          </ul>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
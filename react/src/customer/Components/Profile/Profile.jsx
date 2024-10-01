import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, ShoppingBag, Eye } from 'lucide-react';
import { fetchUserInfo, fetchRentOuts, setActiveTab } from '../../../Redux/Customers/Profile/Action';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import RentOutDetails from './RentOutDetails';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeTab, userInfo, rentOuts, loading, error, totalPages } = useSelector(state => state.profile);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState("");
  const [dateOrder, setDateOrder] = useState("");

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchRentOuts(page - 1, size, status, dateOrder));
  }, [dispatch, page, size, status, dateOrder]);

  useEffect(() => {
    // Set active tab based on the current path
    if (location.pathname === '/account/profile') {
      dispatch(setActiveTab('userInfo'));
    } else if (location.pathname.startsWith('/account/profile/rentouts') || location.pathname.startsWith('/account/profile/rentout/')) {
      dispatch(setActiveTab('rentOuts'));
    }
  }, [location, dispatch]);

  const handleViewDetails = (itemId) => {
    navigate(`/account/profile/rentout/${itemId}`);
  };


  const renderUserInfo = () => (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <User className="mr-2 text-blue-600" />
        User Information
      </h2>
      {userInfo && (
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
          <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
          <p><span className="font-semibold">Contact:</span> {userInfo.contact}</p>
        </div>
      )}
    </div>
  );

  const renderRentOuts = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Rent Outs</h2>

      <div className="flex justify-end mb-4">
        <select
          className="border rounded-lg p-2 pr-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECT">Rejected</option>
        </select>

        <select
          className="border rounded-lg p-2 ml-8 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={dateOrder}
          onChange={(e) => setDateOrder(e.target.value)}
        >
          <option value="">Sort by Date</option>
          <option value="ASC">Available From (ASC)</option>
          <option value="DESC">Available From (DESC)</option>
        </select>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-50">
            <tr>
              {['Item Name', 'Brand', 'Category', 'Size', 'Rental Price', 'Available From', 'Available To', 'Status', 'Actions'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rentOuts.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.size}</td>
                <td className="px-6 py-4 whitespace-nowrap">PKR.{item.rentalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.availableFrom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.availableTo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
      onClick={() => handleViewDetails(item.id)}
      className="text-blue-600 hover:text-blue-900 flex items-center"
    >
      <Eye className="mr-1" size={16} />
      View Details
    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded-full transition-colors ${
                page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <select
          className="border rounded-lg p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
        </select>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) return <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-lg font-semibold text-red-600">Error: {error}</p>;

    if (location.pathname.startsWith('/account/profile/rentout/')) {
      return <RentOutDetails onBack={() => navigate('/account/profile/rentouts')} />;
    }

    switch (activeTab) {
      case 'userInfo':
        return renderUserInfo();
      case 'rentOuts':
        return renderRentOuts();
      default:
        return <p className="text-center text-lg text-gray-500">Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6"> 
          <h1 className="text-2xl font-bold text-blue-600 mb-6">Profile</h1>
          <ul>
            <li
              className={`mb-4 p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'userInfo' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => {
                dispatch(setActiveTab('userInfo'));
                navigate('/account/profile');
              }}
            >
              <User className="inline-block mr-2 text-blue-600" size={18} />
              User Info
            </li>
            <li
              className={`mb-4 p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'rentOuts' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => {
                dispatch(setActiveTab('rentOuts'));
                navigate('/account/profile/rentouts');
              }}
            >
              <ShoppingBag className="inline-block mr-2 text-blue-600" size={18} />
              Rent Outs
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
import React from 'react';
import closetImage from '../Data/images/rentout-closet-section.jpg';
import { useNavigate } from 'react-router-dom';

const RentOutClosetSection = () => {

  const navigate = useNavigate();

  const handleRentOutClick = () => {
    navigate('/rentout');  // Assumes the path to RentOut.jsx is '/rent-out'
  };

  return (
    <div className="flex flex-row md:flex-row max-w-full h-[350px] min-h-[250px] mx-auto bg-white shadow-md">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <img
          src={closetImage}
          alt="Closet with Clothes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="bg-lightPink w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-baseline p-5 md:p-6">
        <h2 className="text-4xl md:text-2xl font-bold text-gray-800 mb-2">
          Earn by renting out<br />your closet
        </h2>
        <p className="text-s md:text-sm text-gray-600 mb-3 md:mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
        </p>
        <button 
        onClick={handleRentOutClick}
        className="bg-yellow-500 text-black px-3 py-1.5 rounded-full text-xs font-semibold w-28 hover:bg-yellow-600 transition-colors duration-200">
          Rent Out
        </button>
      </div>
    </div>
  );
};

export default RentOutClosetSection;
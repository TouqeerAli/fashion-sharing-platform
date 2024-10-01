import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRentOutDetails } from '../../../Redux/Customers/Profile/Action';
import { ArrowLeft, Package, DollarSign, Calendar, Tag, Info } from 'lucide-react';
import { Dialog, DialogContent, IconButton, Button } from '@mui/material';
import { ArrowBack, ArrowForward, Close } from '@mui/icons-material';

const RentOutDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { rentOutDetails, loadingDetails, errorDetails } = useSelector(state => state.profile);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchRentOutDetails(id));
    }
  }, [dispatch, id]);

  if (loadingDetails) return <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>;
  if (errorDetails) return <p className="text-center text-lg font-semibold text-red-600">Error: {errorDetails}</p>;
  if (!rentOutDetails) return null;

  const handleOpenImageModal = (index) => {
    setCurrentImageIndex(index);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setOpenImageModal(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === rentOutDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? rentOutDetails.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <button
        onClick={() => navigate('/account/profile/rentouts')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Rent Outs
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">{rentOutDetails.itemName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InfoItem icon={<Package />} label="Brand" value={rentOutDetails.brand} />
          <InfoItem icon={<Tag />} label="Category" value={rentOutDetails.category?.name} />
          <InfoItem icon={<Info />} label="Size" value={rentOutDetails.size} />
          <InfoItem icon={<DollarSign />} label="Rental Price" value={`PKR ${rentOutDetails.rentalPrice}`} />
        </div>
        <div className="space-y-4">
          <InfoItem icon={<Calendar />} label="Available From" value={rentOutDetails.availableFrom} />
          <InfoItem icon={<Calendar />} label="Available To" value={rentOutDetails.availableTo} />
          <InfoItem
            icon={<Info />}
            label="Status"
            value={
              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                rentOutDetails.status === 'Approved' ? 'bg-green-100 text-green-800' :
                rentOutDetails.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {rentOutDetails.status}
              </span>
            }
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700">{rentOutDetails.description}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Product Images</h3>
        <div className="grid grid-cols-3 gap-4">
          {rentOutDetails.images && rentOutDetails.images.length > 0 ? (
            rentOutDetails.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5454/img/rent-out_products_img/${image.imagePath}`}
                alt={rentOutDetails.itemName}
                className="w-full h-40 object-cover rounded-md cursor-pointer"
                onClick={() => handleOpenImageModal(index)}
              />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </div>

      {/* Image Modal for fullscreen view */}
      <Dialog open={openImageModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative" }}>
          <IconButton onClick={handleCloseModal} sx={{ position: "absolute", top: 10, right: 10 }}>
            <Close />
          </IconButton>
          {rentOutDetails.images && rentOutDetails.images.length > 0 && (
            <>
              <img
                src={`http://localhost:5454/img/rent-out_products_img/${rentOutDetails.images[currentImageIndex].imagePath}`}
                alt={rentOutDetails.itemName}
                className="w-full h-auto rounded-md"
              />
              <IconButton onClick={handlePrevImage} sx={{ position: "absolute", top: "50%", left: 10 }}>
                <ArrowBack />
              </IconButton>
              <IconButton onClick={handleNextImage} sx={{ position: "absolute", top: "50%", right: 10 }}>
                <ArrowForward />
              </IconButton>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-blue-600 mr-3">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default RentOutDetails;

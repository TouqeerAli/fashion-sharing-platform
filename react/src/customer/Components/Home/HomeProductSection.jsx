import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeProductCard from './HomeProductCard';
import { findProductByOccasion } from '../../../Redux/Customers/Product/Action';
import AliceCarousel from "react-alice-carousel";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeProductSection = ({ section }) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  // Get occasion-specific data from Redux store
  const { 
    occasionProducts, 
    occasionLoading, 
    occasionError 
  } = useSelector((state) => state.customersProduct);

  // Get products for this specific occasion
  const products = occasionProducts[section] || [];
  const isLoading = occasionLoading[section];
  const error = occasionError[section];

  useEffect(() => {
    // Only fetch if we don't have products for this occasion
    if (!occasionProducts[section] && !isLoading) {
      dispatch(findProductByOccasion({ occasion: section }));
    }
  }, [dispatch, section, occasionProducts, isLoading]);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2, itemsFit: "contain" },
    568: { items: 3, itemsFit: "contain" },
    1024: { items: 5, itemsFit: "contain" },
  };

  // Create carousel items from products
  const items = products.map((product) => (
    <div key={product.id} className="px-2">
      <HomeProductCard product={product} />
    </div>
  ));

  if (isLoading) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 py-5">
          {section.charAt(0).toUpperCase() + section.slice(1)} Wear
        </h2>
        <div className="p-4 flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 py-5">
          {section.charAt(0).toUpperCase() + section.slice(1)} Wear
        </h2>
        <div className="p-4 text-red-500 border border-red-200 rounded-md bg-red-50">
          Error: {error}
        </div>
      </div>
    );
  }

  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 mb-10">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">
        {section.charAt(0).toUpperCase() + section.slice(1)} Wear
      </h2>
      <div className="relative border rounded-lg shadow-sm p-5 bg-white">
      <AliceCarousel
  disableButtonsControls
  disableDotsControls
  mouseTracking
  items={items}
  activeIndex={activeIndex}
  responsive={responsive}
  onSlideChanged={syncActiveIndex}
  animationType="slide" // Change this line
  animationDuration={400} // Adjust the duration as needed
  infinite={false}
  paddingLeft={10}
  paddingRight={10}
/>

        {/* Navigation Buttons */}
        {activeIndex < items.length - 5 && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="navigation-button"
            sx={{
              position: "absolute",
              top: "50%",
              right: "0rem",
              transform: "translate(50%, -50%)",
              backgroundColor: "white",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              zIndex: 10
            }}
            color="white"
            aria-label="next"
          >
            <ArrowForwardIosIcon 
              sx={{ 
                fontSize: "1.2rem",
                color: "#666"
              }} 
            />
          </Button>
        )}

        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            className="navigation-button"
            sx={{
              position: "absolute",
              top: "50%",
              left: "0rem",
              transform: "translate(-50%, -50%) rotate(180deg)",
              backgroundColor: "white",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              zIndex: 10
            }}
            color="white"
            aria-label="previous"
          >
            <ArrowForwardIosIcon 
              sx={{ 
                fontSize: "1.2rem",
                color: "#666"
              }} 
            />
          </Button>
        )}
      </div>

      {/* Optional: Add a "View All" button */}
      {products.length > 5 && (
        <div className="flex justify-center mt-4">
          <button 
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => {/* Add your view all logic here */}}
          >
            View All {section} Products
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeProductSection;
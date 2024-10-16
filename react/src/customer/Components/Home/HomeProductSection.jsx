// import AliceCarousel from "react-alice-carousel";
// import HomeProductCard from "./HomeProductCard";
// import "./HomeProductSection.css";
// import { Button } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useState } from "react";

// const HomeProductSection = ({ section, data }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const slidePrev = () => setActiveIndex(activeIndex - 1);
//   const slideNext = () => setActiveIndex(activeIndex + 1);
//   const syncActiveIndex = ({ item }) => setActiveIndex(item);

//   const responsive = {
//     0: {
//       items: 2,
//       itemsFit: "contain",
//     },
//     568: {
//       items: 3,
//       itemsFit: "contain",
//     },
//     1024: {
//       items: 5.5,
//       itemsFit: "contain",
//     },
//   };
//   const items = data?.slice(0, 10).map((item) => (
//     <div className="">
//       {" "}
//       <HomeProductCard product={item} />
//     </div>
//   ));

//   // const slideInFromRight = (t) => {
//   //   return `translateX(${100 - t * 100}%)`;
//   // };

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8 ">
//       <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//       <div className="relative border p-5">
//         <AliceCarousel
//           disableButtonsControls
//           disableDotsControls
//           mouseTracking
//           items={items}
//           activeIndex={activeIndex}
//           responsive={responsive}
//           onSlideChanged={syncActiveIndex}
//           animationType="fadeout"
//           animationDuration={2000}
//         />
//         {activeIndex !== items.length - 5 && (
//           <Button
//             onClick={slideNext}
//             variant="contained"
//             className="z-50 bg-[]"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               right: "0rem",
//               transform: "translateX(50%) rotate(90deg)",
//             }}
//             color="white"
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon
//               className=""
//               sx={{ transform: "rotate(-90deg)" }}
//             />
//           </Button>
//         )}

//         {activeIndex !== 0 && (
//           <Button
//             onClick={slidePrev}
//             variant="contained"
//             className="z-50 bg-[]"
//             color="white"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               left: "0rem",
//               transform: "translateX(-50%)  rotate(90deg)",
//             }}
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon
//               className=""
//               sx={{ transform: " rotate(90deg)" }}
//             />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeProductSection;




// components/HomeProductSection.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeProductCard from './HomeProductCard'; // Product Card component
import { findProducts } from '../../../Redux/Customers/Product/Action';
import AliceCarousel from "react-alice-carousel"; // Carousel component
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeProductSection = ({ section }) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  // Get product data from Redux store
  const customersProduct = useSelector((state) => state.customersProduct);
  const { loading, products, error } = customersProduct;



  useEffect(() => {
    // Example filter object to fetch products (customize this as needed)
    const reqData = {
      colors: ['Red', 'Blue', 'Black', 'black', 'White','Brown','Green','green'],
      sizes: ['M', 'S','L'],
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 10,
      category: section,
      stock: 'in_stock',
      sort: 'ASC',
      pageNumber: 0,
      pageSize: 10,
    };

    // Dispatch action to fetch products from the API
    dispatch(findProducts(reqData));
  
  }, [dispatch, section]);
  
  

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2, itemsFit: "contain" },
    568: { items: 3, itemsFit: "contain" },
    1024: { items: 5.5, itemsFit: "contain" },
  };

  // Handle items safely if products are defined and available
  const items = products?.content?.length > 0
    ? products.content.slice(0, 10).map((product) => (
        <div key={product.id}>
          <HomeProductCard product={product} />
        </div>
      ))
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">
        {section.charAt(0).toUpperCase() + section.slice(1)} 
      </h2>                                                  
      <div className="relative border p-5">
        {items.length > 0 ? (
          <AliceCarousel
            disableButtonsControls
            disableDotsControls
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={responsive}
            onSlideChanged={syncActiveIndex}
            animationType="fadeout"
            animationDuration={2000}
          />
        ) : (
          <div>No products available.</div>
        )}

        {/* Next Button */}
        {activeIndex < items.length - 5 && (
          <Button
            onClick={slideNext}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
            }}
            color="white"
            aria-label="next"
          >
            <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
          </Button>
        )}

        {/* Previous Button */}
        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(90deg)",
            }}
            color="white"
            aria-label="previous"
          >
            <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;

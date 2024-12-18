import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3"
    >
      <div className="h-[13rem] w-[10rem]">
    
        <img
          className="object-cover object-top w-full h-full"
          src={`http://localhost:5454/img/rent-out_products_img/${product?.images?.[1]?.imagePath}`}
          alt={product?.images?.[0]?.imagePath}
        
        />
      </div>

      <div className="p-4 ">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.itemName}
        </h3>
        <p className="mt-2 text-base text-gray-700">{product?.brand}</p>
        <p className="mt-2 text-base text-gray-800">Rent Price : {product?.rentalPrice}</p>
      </div>
    </div>
  );
};

export default HomeProductCard;

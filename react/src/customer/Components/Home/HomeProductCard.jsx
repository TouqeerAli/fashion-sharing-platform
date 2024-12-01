import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="productCard w-[15rem] border m-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={`http://localhost:5454/img/rent-out_products_img/${product?.images?.[0]?.imagePath}`}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product?.brand}</p>
          <p className="">{product?.itemName}</p>
          <p className="font-semibold opacity-50">{product?.color}</p>
        </div>

        <div className="flex space-x-2 items-center">
          <p className="font-semibold">PKR.{product?.rentalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
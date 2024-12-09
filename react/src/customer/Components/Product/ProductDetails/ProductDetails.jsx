import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Ratin,
  TextField,
} from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";

const SizeTable = ({ sizeData }) => {
  if (!sizeData) return null;

  return (
    <div className="mt-6 border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shoulder
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Chest
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Waist
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Length
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hip
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sleeves
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arm Hole
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {sizeData.name}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.shoulder}"
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.chest}"
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.waist}"
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.topLength}"
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.hip}"
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.sleeves}"
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {sizeData.armHole}"
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [activeImage, setActiveImage] = useState(
    customersProduct.product?.images?.[0] || null
  );
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  // console.log("param",productId,customersProduct.product)

  const [rentalDate, setRentalDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const availableFrom = new Date(customersProduct.product?.availableFrom);
    const availableTo = new Date(customersProduct.product?.availableTo);
    const rentalDateParsed = new Date(rentalDate);
    const returnDateParsed = new Date(returnDate);

    // Validate date selection
    if (rentalDateParsed < availableFrom) {
      setErrorMessage("Rental date cannot be earlier than Available From.");
      return;
    }
    if (returnDateParsed > availableTo) {
      setErrorMessage("Return date cannot be later than Available To.");
      return;
    }
    if (rentalDateParsed > returnDateParsed) {
      setErrorMessage("Return date must be after the rental date.");
      return;
    }

    // Proceed with adding to cart
    const data = { productId };
    dispatch(addItemToCart({ data, jwt }));
    navigate("/cart");
  };

  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a
                  href={"/"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Home
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li key={customersProduct.product?.category.id}>
              <div className="flex items-center">
                {/* <a
                    href={"/"}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {customersProduct.product?.category.name}
                  </a> */}
                {customersProduct.product?.category.name}
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a
                href={() => navigate(`/product/${customersProduct.product.id}`)}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {customersProduct.product?.itemName}
              </a>
            </li>
          </ol>
        </nav>

        {/* product details */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          {/* <div className="flex flex-col items-center ">
            <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || customersProduct.product?.imageUrl}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetActiveImage(image)}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <img
                    src={image.src}
                    alt={product.images[1].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col items-center">
            {/* Active Image */}
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={`http://localhost:5454/img/rent-out_products_img/${
                  activeImage?.imagePath ||
                  customersProduct.product?.images?.[0]?.imagePath
                }`}
                alt={
                  activeImage?.imagePath ||
                  customersProduct.product?.images?.[0]?.imagePath
                }
                className="h-full w-full object-cover object-center transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex flex-wrap space-x-5 justify-center mt-4">
              {customersProduct.product?.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetActiveImage(image)} // Click handler to set active image
                  className="relative aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] cursor-pointer transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={`http://localhost:5454/img/rent-out_products_img/${image.imagePath}`}
                    alt={"Cloth Image"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                {customersProduct.product?.itemName}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {customersProduct.product?.brand}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  Rental Price: PKR {customersProduct.product?.rentalPrice}
                </p>
             
                {/* <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p> */}
              </div>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
               
                <p className="text-green-600 font-semibold">
                  Security Deposit: PKR {customersProduct.product?.purchasePrice}
                </p> 
                
              </div>

              <div className="mt-6">
                {/* <p><strong>Category:</strong> {customersProduct.product?.category}</p> */}
                <p>
                  <strong>Size:</strong> {customersProduct.product?.size}
                </p>
                <p>
                  <strong>Available From:</strong>{" "}
                  {customersProduct.product?.availableFrom}
                </p>
                <p>
                  <strong>Available To:</strong>{" "}
                  {customersProduct.product?.availableTo}
                </p>

                <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">
                  Size Details
                </h3>
                <SizeTable sizeData={customersProduct.product?.rentOutSize} />
              </div>
              </div>

             
              {/* Reviews */}
              {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>

                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60 text-sm">42807 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div> */}

              <form className="mt-10" onSubmit={handleSubmit}>
                {/* Rental Date and Return Date */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Rental Date"
                      type="date"
                      value={rentalDate}
                      onChange={(e) => setRentalDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Return Date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>

                {errorMessage && (
                  <p className="text-red-500 mt-4">{errorMessage}</p>
                )}

                {/* Rent Now and Add to Cart Buttons */}

                <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="terms"
          
          className="mr-2"
        />
        <label htmlFor="terms">I agree to the Terms and Conditions</label>
      </div>
                <div className="mt-10 flex space-x-4">
                  {/* <Button
                    variant="contained"
                    sx={{ padding: ".8rem 2rem" }}
                    // onClick={() => handleRentNow(customersProduct.product?.id)}
                    onClick={() => navigate("/checkout?step=2")}
                  >
                    Rent Now
                  </Button> */}
                  
                    
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".8rem 2rem" }}
                  >
                    Add To Cart
                  </Button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {customersProduct.product?.description}
                  </p>
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* rating and review section */}
        {/* <section className="">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {customersProduct.product?.reviews.map((item, i) => (
                    <ProductReviewCard item={item} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-10">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60">42807 Ratings</p>
                </div>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Excellent</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Very Good</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={30}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Good</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className="bg-[#885c0a]"
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={25}
                        color="orange"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Avarage</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#885c0a", // stroke color
                          },
                        }}
                        variant="determinate"
                        value={21}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Poor</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section> */}

        {/* similer product */}
        {/* <section className=" pt-10">
          <h1 className="py-5 text-xl font-bold">Similer Products</h1>
          <div className="flex flex-wrap space-y-5">
            {gounsPage1.map((item) => (
              <HomeProductCard product={item} />
            ))}
          </div>
        </section> */}
      </div>
    </div>
  );
}

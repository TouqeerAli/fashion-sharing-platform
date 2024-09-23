import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitRentOutItem } from "../../../Redux/Customers/RentOut/Action"; // Import your action
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const RentOutForm = () => {
  const dispatch = useDispatch();

  // Local state for form fields
  const [formData, setFormData] = useState({
    itemName: "",
    brand: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    size: "",
    color: "",
    description: "",
    rentalPrice: "",
    purchasePrice: "",
    availableFrom: "",
    availableTo: "",
    name: "",
    email: "",
    contact: "",
    pickupLocation: "",
    termsAndConditions: false,
  });

  // Local state for image files
  const [imageFiles, setImageFiles] = useState([]);

  const [showPopup, setShowPopup] = useState(false);


  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle multiple image file selection
  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object for submission
    const data = new FormData();

    // Create FormData object for submission

    // Append form data fields
    for (const key in formData) {
      console.log(key, formData[key]);
      data.append(key, formData[key]);
    }

    // Append multiple image files
    for (let i = 0; i < imageFiles.length; i++) {
      console.log("images", imageFiles[i]);
      data.append("images", imageFiles[i]);
    }

    // Dispatch action to submit the form and images
    try {
      dispatch(submitRentOutItem(data));
      setShowPopup(true);
      setFormData({
        // Reset form fields
        itemName: "",
        brand: "",
        topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
        size: "",
        color: "",
        description: "",
        rentalPrice: "",
        purchasePrice: "",
        availableFrom: "",
        availableTo: "",
        name: "",
        email: "",
        contact: "",
        pickupLocation: "",
        termsAndConditions: false,
        imageFiles: [],
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  const onClose = () => {
    setShowPopup(false);
};
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Rent Out Your Fashion Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
         
          <TextField
          fullWidth
           label="Name"
              
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
         
          <TextField
           fullWidth
           label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Contact */}
        <div>
        
          <TextField
           fullWidth
           label="Contact Number"
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Item Name */}
        <div>
        
          <TextField
           fullWidth
           label="Item Name"
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Brand */}
        <div>
         
          <TextField
           fullWidth
           label="Brand"
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={formData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
                required
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={formData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
                required
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={formData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
                required
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="shirts">Shirts</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
              </Select>
            </FormControl>
        {/* <div>
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           // required
          />
        </div> */}

        {/* Size */}
        <div>
          
          <TextField
           fullWidth
           label="Size"
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           required
          />
        </div>

        {/* Color */}
        <div>
          
          <TextField
           fullWidth
           label="Color"
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
        
          <TextField
           fullWidth
           label="Description"
            id="description"
            multiline
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rental Price */}
        <div>
         
          <TextField
           fullWidth
           label="Rental Price"
            type="number"
            id="rentalPrice"
            name="rentalPrice"
            value={formData.rentalPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Purchase Price */}
        <div>
      
          <TextField
           fullWidth
           label="Purchase Price"
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Pickup Location */}
        <div>
         
          <TextField
           fullWidth
           label="Pickup Location"
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Available From */}
        <div>
          <label htmlFor="availableFrom" className="block text-gray-700">
            Available From
          </label>
          <TextField
           fullWidth
        
            type="date"
            id="availableFrom"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Available To */}
        <div>
          <label htmlFor="availableTo" className="block text-gray-700">
            Available To
          </label>
          <TextField
           fullWidth
        
            type="date"
            id="availableTo"
            name="availableTo"
            value={formData.availableTo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* File input for images */}
        <div>
          <label htmlFor="images" className="block text-gray-700">
            Product Images
          </label>
          <TextField
           fullWidth
         
            type="file"
            name="images"
            multiple
            required
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg mt-3"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAndConditions"
            name="termsAndConditions"
            checked={formData.termsAndConditions}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500"
            required
          />
          <label htmlFor="termsAndConditions" className="ml-2 text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button> */}
        <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              size="large"
              type="submit"
            >
              Submit
            </Button>
      </form>
      {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                      <div className="text-center">
                          <h2 className="text-xl font-bold mb-2">Form Submitted</h2>
                          <p className="mb-4">Our Team Will contact you soon</p>
                          <button 
                              onClick={onClose} 
                              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                          >
                              Close
                          </button>
                      </div>
                  </div>
              </div>
       
            )}
    </div>
  );
};

export default RentOutForm;

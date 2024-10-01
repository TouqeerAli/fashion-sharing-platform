import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRentOutProducts,
  fetchRentOutRequests,
  approveRentOutProduct,
  rejectRentOutProduct,
} from "../../../Redux/Admin/RentOut/Action";
import { useNavigate } from "react-router-dom";

const AdminRentOutProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rentOutProducts, loading, error, totalPages } = useSelector(
    (state) => state.adminsRentOut
  );

  const [page, setPage] = React.useState(1);  // Tracks current page
  const [size, setSize] = React.useState(10);  // Tracks items per page
  const [status, setStatus] = React.useState(""); // Tracks selected status
  const [dateOrder, setDateOrder] = React.useState(""); // Tracks selected date sort order


  // Fetch rent out requests on component mount and when page/size changes
  useEffect(() => {
    console.log(dateOrder);
    dispatch(fetchRentOutRequests(page - 1, size, status, dateOrder)); // page-1 because backend expects zero-indexed
  }, [dispatch, page, size, status, dateOrder]);



  // useEffect(() => {
  //   dispatch(fetchRentOutProducts(page - 1));
  // }, [dispatch, page]);


  
  const handleApprove = (productId) => {
    dispatch(approveRentOutProduct(productId));
  };

  const handleReject = (productId) => {
    dispatch(rejectRentOutProduct(productId));
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };
  
  const handleViewDetails = (id) => {
    navigate(`/admin/rentoutproduct/${id}`); // Navigate to RentOutProductDetail with the product ID
  };



  // Handle size change from dropdown
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPage(1); // Reset to first page when size changes
  };

// Handle Status dropdown change
const handleStatusChange = (event) => {
  setStatus(event.target.value);
  setPage(1); // Reset to first page when status changes
};

// Handle Date sorting dropdown change
const handleDateOrderChange = (event) => {
  setDateOrder(event.target.value);
  setPage(1); // Reset to first page when date order changes
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box width={"100%"}>
      <Card className="mt-2">
        <CardHeader
          title="Rent-Out Products Requests"
          sx={{
            pt: 2,
            alignItems: "center",
            textAlign: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />

          {/* Filters Section */}
        <Box display="flex" justifyContent="space-between" mb={2} mt={2} px={2}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort by Date</InputLabel>
            <Select
              value={dateOrder}
              onChange={handleDateOrderChange}
              label="Sort by Date"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>



        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="rent-out table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>Item Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Customer Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Brand</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Rental Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Available From</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Available To</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentOutProducts?.length > 0 ? (
                rentOutProducts.map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>
                      {typeof item.itemName === "string" ? item.itemName : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {typeof item.name === "string" ? item.name : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {typeof item.brand === "string" ? item.brand : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.category && typeof item.category.name === "string"
                        ? item.category.name
                        : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.rentalPrice != null ? `$${item.rentalPrice}` : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.availableFrom
                        ? new Date(item.availableFrom).toLocaleDateString()
                        : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.availableTo
                        ? new Date(item.availableTo).toLocaleDateString()
                        : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          color:
                            item.status === "Pending"
                              ? "yellow"
                              : item.status === "Approved"
                              ? "green"
                              : item.status === "Rejected"
                              ? "red"
                              : "inherit", // Default color if status is not matched
                          fontWeight: 500,
                        }}
                      >
                        {item.status != null ? item.status : "N/A"}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="text"
                        sx={{ color: "blue" }}
                        onClick={() => handleViewDetails(item.id)}
                      >
                        View Details
                      </Button>
                      {/* <Button
                        variant="text"
                        sx={{ color: "green" }}
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="text"
                        sx={{ color: "red" }}
                        onClick={() => handleReject(item.id)}
                      >
                        Reject
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={totalPages}
            color="primary"
            page={page}
            onChange={handlePaginationChange}
          />
        </div>
      </Card> */}

      {/* Dropdown for items per page */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="items-per-page-label">Items per page</InputLabel>
          <Select
            labelId="items-per-page-label"
            id="items-per-page"
            value={size}
            onChange={handleSizeChange}
            label="Items per page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages > 0 ? totalPages : 1} // Ensure totalPages is a valid number
          color="primary"
          page={page}
          onChange={handlePaginationChange}
        />
      </Box>
    </Box>
  );
};

export default AdminRentOutProducts;

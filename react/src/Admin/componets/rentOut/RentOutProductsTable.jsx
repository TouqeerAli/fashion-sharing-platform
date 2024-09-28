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

const AdminRentOutProducts = () => {
  const dispatch = useDispatch();
  const { rentOutProducts, loading, error, totalPages } = useSelector(
    (state) => state.adminsRentOut
  );

  const [page, setPage] = React.useState(1);  // Tracks current page
  const [size, setSize] = React.useState(10);  // Tracks items per page

  // Fetch rent out requests on component mount and when page/size changes
  useEffect(() => {
    dispatch(fetchRentOutRequests(page - 1, size)); // page-1 because backend expects zero-indexed
  }, [dispatch, page, size]);



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

  // Handle size change from dropdown
  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPage(1); // Reset to first page when size changes
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box width={"100%"}>
      <Card className="mt-2">
        <CardHeader
          title="All Rent-Out Requests"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="rent-out table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Brand</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Rental Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Available From
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Available To</TableCell>
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
                    <TableCell>
                      <Avatar alt={item.itemName} src={item.images[0]} />
                    </TableCell>

                    <TableCell
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          <Link
                            to={`/admin/rentoutproduct/${item.id}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              transition:
                                "color 0.3s ease, transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "#4a90e2"; // Your preferred hover color
                              e.target.style.transform = "scale(1.05)"; // Slightly enlarge on hover
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "inherit"; // Reset color after hover
                              e.target.style.transform = "scale(1)"; // Reset scale after hover
                            }}
                          >
                            {typeof item.itemName === "string"
                              ? item.itemName
                              : "N/A"}
                          </Link>
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}>
                            {typeof item.itemName === 'string' ? item.itemName : 'N/A'}
                          </Typography>
                          {/* <Typography variant="caption">
                            {typeof item.brand === 'string' ? item.brand : 'N/A'}
                          </Typography> 
                        </Box>
                      </TableCell> */}

                    <TableCell sx={{ textAlign: "center" }}>
                      {typeof item.brand === "string" ? item.brand : "N/A"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.category && typeof item.category.name === "string"
                        ? item.category.name
                        : "N/A"}
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      {item.rentalPrice != null
                        ? `$${item.rentalPrice}`
                        : "N/A"}
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
                      <Button
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
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
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

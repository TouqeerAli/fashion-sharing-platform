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
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRentOutProducts,
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
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchRentOutProducts(page - 1));
  }, [dispatch, page]);

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

      <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={totalPages}
            color="primary"
            page={page}
            onChange={handlePaginationChange}
          />
        </div>
      </Card>
    </Box>
  );
};

export default AdminRentOutProducts;

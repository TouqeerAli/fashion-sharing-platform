import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React from 'react'
import { dressPage1 } from '../../Data/dress/page1'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  fetchRentOutRequests,
} from "../../Redux/Admin/RentOut/Action";

const RecentlyAddeddProducts = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { rentOutProducts, loading, error, totalPages } = useSelector(
      (state) => state.adminsRentOut
    );

    useEffect(() => {
      dispatch(fetchRentOutRequests(0, 5, '', 'DESC')); // page-1 because backend expects zero-indexed
    }, [dispatch]);






  return (
    <Card>
       <CardHeader
          title='Recently Added Products'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography onClick={()=>navigate("/admin/rentout")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
          titleTypographyProps={{
            variant: 'h5',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
    <TableContainer>
      <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
        <TableHead>
          <TableRow>
             <TableCell>Brand</TableCell>
            <TableCell>Title</TableCell>
           <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
             <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentOutProducts.map((item) => (
            <TableRow hover key={item.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
             <TableCell>{item.brand} </TableCell>
             
              <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{item.title}</Typography>
                  <Typography variant='caption'>{item.brand}</Typography>
                </Box>
              </TableCell>
              <TableCell>{"dress"}</TableCell>
              <TableCell>{item.rentalPrice}</TableCell>
              <TableCell>{item.status != null ? item.status : "N/A"}</TableCell>
              
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
  )
}

export default RecentlyAddeddProducts
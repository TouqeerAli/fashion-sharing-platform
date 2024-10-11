// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import React, { useState, useEffect } from "react";
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from "../../../config/api";
// const rows = [
//   {
//     age: 27,
//     status: 'current',
//     date: '09/27/2018',
//     name: 'Sally Quinn',
//     salary: '$19586.23',
//     email: 'eebsworth2m@sbwire.com',
//     designation: 'Human Resources Assistant',
//     image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
//   },
//   {
//     age: 61,
//     date: '09/23/2016',
//     salary: '$23896.35',
//     status: 'professional',
//     name: 'Margaret Bowers',
//     email: 'kocrevy0@thetimes.co.uk',
//     designation: 'Nuclear Power Engineer',
//     image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
//   },
//   {
//     age: 59,
//     date: '10/15/2017',
//     name: 'Minnie Roy',
//     status: 'rejected',
//     salary: '$18991.67',
//     email: 'ediehn6@163.com',
//     designation: 'Environmental Specialist',
//     image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
//   },
//   {
//     age: 30,
//     date: '06/12/2018',
//     status: 'resigned',
//     salary: '$19252.12',
//     name: 'Ralph Leonard',
//     email: 'dfalloona@ifeng.com',
//     designation: 'Sales Representative',
//     image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
//   },
//   {
//     age: 66,
//     status: 'applied',
//     date: '03/24/2018',
//     salary: '$13076.28',
//     name: 'Annie Martin',
//     designation: 'Operator',
//     email: 'sganderton2@tuttocitta.it',
//     image:"https://rukminim1.flixcart.com/image/832/832/xif0q/lehenga-choli/c/v/q/free-half-sleeve-sadhna-kedar-fab-original-imagpawdqwjqz6vt.jpeg?q=70"
//   },
//   {
//     age: 33,
//     date: '08/25/2017',
//     salary: '$10909.52',
//     name: 'Adeline Day',
//     status: 'professional',
//     email: 'hnisius4@gnu.org',
//     designation: 'Senior Cost Accountant'
//   },
//   {
//     age: 61,
//     status: 'current',
//     date: '06/01/2017',
//     salary: '$17803.80',
//     name: 'Lora Jackson',
//     designation: 'Geologist',
//     email: 'ghoneywood5@narod.ru'
//   },
//   {
//     age: 22,
//     date: '12/03/2017',
//     salary: '$12336.17',
//     name: 'Rodney Sharp',
//     status: 'professional',
//     designation: 'Cost Accountant',
//     email: 'dcrossman3@google.co.jp'
//   }
// ]



function CustomerList() {
  const [customers, setCustomers] = useState([]); // State to store the fetched customer data
  const [loading, setLoading] = useState(true); // Loading state to handle loading status
  const [error, setError] = useState(null); // State to handle errors if any

  // Function to fetch customer data from Spring Boot backend
  const fetchCustomers = async () => {
    try {
      const response = await api.get(`/api/users/allCustomers`); // Make sure the URL is correct
      // if (!response.ok) {
      //   throw new Error('Failed to fetch customers');
      // }
      console.log("customers"+JSON.stringify(response.data));
      const data = response.data;
       // Parse the JSON response
      setCustomers(data); // Set the fetched data to state
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message); // Set the error state
      setLoading(false); // Stop loading in case of an error
    }
  };

  // useEffect to fetch the data when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []); // Empty array ensures this runs only once when the component mounts

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error if there is one
  if (error) {
    return <div>Error: {error}</div>;
  }


// const Customers = () => {
//   const navigate=useNavigate();
//   function handlePaginationChange(event, value) {
//     console.log("Current page:", value);
//   }
  return (
    <Box>
         <Card>
      <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
        />
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>User Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {customers.map((customer, index) => (
              <TableRow hover key={customer.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{customer.firstName}{customer.lastName ? ' '+customer.lastName : ' '}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.contact ? customer.contact : ' '}</TableCell>
                
                
               
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    {/* <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card> */}
    </Box>
   
  )
}

export default CustomerList;

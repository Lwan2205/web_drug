import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeUserRole from '../component/ChangeUseRole';
import Pagination from '../component/Pagination'; // Import the Pagination component
import "../assets/css/allUsers.css";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const usersPerPage = 10;

    const fetchAllUsers = async (page = 1) => {
        try {
            const response = await fetch(`${SummaryApi.allUser.url}?page=${page}&limit=${usersPerPage}`, { // Pass page and limit as query params
                method: "GET",
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setAllUsers(data.data);
                setTotalPages(data.totalPages); // Set the total pages from the response
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users.");
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(SummaryApi.deleteUser(userId).url, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            data.success ? toast.success("User deleted successfully") : toast.error("Failed to delete user");
            fetchAllUsers(currentPage); // Refresh the current page
        } catch (error) {
            toast.error("Error deleting user.");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page
        fetchAllUsers(page); // Fetch users for the new page
    };

    useEffect(() => {
        fetchAllUsers(currentPage); // Initial fetch with the first page
    }, [currentPage]); // Fetch users when the page changes

    return (
        <div className='bg-white pb-4'>
            {/* <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((user, index) => (
                        <tr key={user._id}>
                            <td>{(currentPage - 1) * 10 + index + 1}</td> {/* Adjust index for the current page */}
            {/* <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.isAdmin ? "Admin" : "User"}</td>
                            <td>{moment(user.createdAt).format('LL')}</td>
                            <td className="flex gap-2">
                                <button
                                    className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white'
                                    onClick={() => {
                                        setUpdateUserDetails(user);
                                        setOpenUpdateRole(true);
                                    }}
                                >
                                    <MdModeEdit />
                                </button>
                                <button
                                    className='bg-red-100 p-2 rounded-full hover:bg-red-500 hover:text-white'
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}



            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }} align='left'>Sr.</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center"> Name</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Email</TableCell>
                                {/* <TableCell sx={{ fontWeight: '700' }} align="center">Address</TableCell> */}
                                <TableCell sx={{ fontWeight: '700' }} align="center">Phone Number</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Role</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Created Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allUser.map((user, index) => (
                                    <TableRow key={user._id}>
                                        <TableCell align='center'>
                                            <p>{(currentPage - 1) * 10 + index + 1}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{user.name}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{user.email}</p>
                                        </TableCell>

                                        {/* <TableCell align="center">
                                            <p>{user.address}</p>
                                        </TableCell> */}
                                        <TableCell align="center">
                                            <p>{user.phoneNumber}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{user.isAdmin ? "Admin" : "User"}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{moment(user.createdAt).format('LL')}</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '5px',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <MdModeEdit className='edit-user_button' onClick={() => {
                                                    setUpdateUserDetails(user);
                                                    setOpenUpdateRole(true);
                                                }} />
                                                <MdDelete className='remove-user_button' onClick={() => handleDeleteUser(user._id)}>
                                                </MdDelete>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.username}
                    email={updateUserDetails.email}
                    phoneNumber={updateUserDetails.phoneNumber}
                    address={updateUserDetails.address}
                    role={updateUserDetails.isAdmin ? "Admin" : "User"}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}

            {/* Add the Pagination component here */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>

    );
};

export default AllUsers;

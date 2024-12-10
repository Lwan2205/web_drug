import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import UpdateManufacturerModal from '../component/UpdateManufacturerModal';
import '../assets/css/ManufacturerList.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdModeEdit, MdDelete } from "react-icons/md";
import moment from 'moment';

const ManufacturerList = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);

    const fetchManufacturers = async () => {
        try {
            const response = await fetch(SummaryApi.getAllManufacturers.url, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setManufacturers(data.data);
        } catch (error) {
            toast.error("Error fetching manufacturers.");
        }
    };

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleEditManufacturer = (manufacturer) => {
        setSelectedManufacturer(manufacturer);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteManufacturer = async (manufacturerId) => {
        try {
            const response = await fetch(SummaryApi.deleteManufacturer(manufacturerId).url, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Manufacturer deleted successfully");
                fetchManufacturers();
            } else {
                toast.error("Error deleting manufacturer.");
            }
        } catch (error) {
            toast.error("Error deleting manufacturer.");
        }
    };

    return (
        <div className="manufacturer-list">
            <h2>Brands List</h2>
            <Link className='add-button_admin' to={"add-all-manufactures"}>Add manufacturer</Link>

            <Box sx={{ margin: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }} align='left'></TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center"> Name</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Country</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Created Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                manufacturers && manufacturers.length >= 0 && manufacturers.map((manufacturer, index) => (
                                    <TableRow key={manufacturer._id}>
                                        <TableCell align='center'>
                                            <img className='img-admin_general' src={manufacturer.images} />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <p>{manufacturer.name}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{manufacturer.country}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{manufacturer.contactInfo}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{moment(manufacturer.createdAt).format('LL')}</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{
                                                display: 'flex',
                                                columnGap: '5px',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <MdModeEdit className='edit-admin_button' onClick={() => {
                                                    handleEditManufacturer(manufacturer)
                                                }} />
                                                <MdDelete className='remove-admin_button' onClick={() => handleDeleteManufacturer(manufacturer._id)}>
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

            {isUpdateModalOpen && (
                <UpdateManufacturerModal
                    manufacturer={selectedManufacturer}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUpdate={fetchManufacturers}
                />
            )}
        </div>
    );
};

export default ManufacturerList;

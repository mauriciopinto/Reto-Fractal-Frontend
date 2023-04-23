import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { deleteContext } from '../../views/orders/MyOrders';

const EditButton = (props) => {
    return (
        <IconButton
            onClick={() => window.location.href = `/add-order/${props.orderId}`}
        >
            <EditIcon />
        </IconButton>
    )
}

const DeleteButton = (props) => {
    const deleteData = React.useContext (deleteContext);
    const [selectedForDelete, setSelectedForDelete] = deleteData.selectedForDelete;
    const [showDeleteModal, setShowDeleteModal] = deleteData.showDeleteModal;

    return (
        <IconButton
            onClick={() => {
                setSelectedForDelete (props.orderId);
                setShowDeleteModal (true);
            }}
        >
            <DeleteIcon />
        </IconButton>
    )
}

const DeleteModal = (props) => {
    const deleteData = React.useContext (deleteContext);
    const [selectedForDelete, setSelectedForDelete] = deleteData.selectedForDelete;
    const [showDeleteModal, setShowDeleteModal] = deleteData.showDeleteModal;
    const deleteOrder = deleteData.deleteOrder;

    return (
        <Backdrop open={showDeleteModal}>
            <Container sx={{
                background: 'white',
                borderRadius: '3px',
                width: '60vw',
                minHeight: '40vh',
                padding: '1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                <IconButton
                    onClick={() => setShowDeleteModal (false)}
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">Are you sure you want to delete this order?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={deleteOrder}>Yes</Button>
                    </Grid>
                </Grid>
            </Container>
        </Backdrop>
    )
}

const OrderTable = (props) => {

    return (
        <Grid item container xs={10}>
            <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Order ID</strong></TableCell>
                        <TableCell><strong>Order #</strong></TableCell>
                        <TableCell><strong>Order Date</strong></TableCell>
                        <TableCell><strong># of Products</strong></TableCell>
                        <TableCell><strong>Final Price</strong></TableCell>
                        <TableCell><strong>Options</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.orders.data.map ((order, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.orderNumber}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.numberOfProducts}</TableCell>
                                    <TableCell>${order.finalPrice}</TableCell>
                                    <TableCell>
                                        <EditButton orderId={order.id}/>
                                        <DeleteButton orderId={order.id}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    
                </TableBody>
            </Table>
            <DeleteModal />
        </Grid>
    )
}

export default OrderTable;
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { deleteContext } from '../../views/orders/MyOrders';

import { updateOrderById } from '../../services/orders/putOrder';
import PageLoader from '../../views/PageLoader';

const EditButton = (props) => {
    return (
        <IconButton
            onClick={() => window.location.href = `/add-order/${props.orderId}`}
            disabled={props.status === "COMPLETED"}
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

const OrderStatusConfirmationModal = (props) => {
    const [loading, setLoading] = React.useState (false);

    function updateOrderStatus (orderId, orderData) {
        setLoading (true);
        updateOrderById (orderId, {
            orderNumber: orderData.orderNumber,
            date: orderData.date,
            numberOfProducts: orderData.numberOfProducts,
            finalPrice: orderData.finalPrice,
            status: "COMPLETED"
        })
        .then ((res) => {
            setLoading (false);
            props.close (false);
            window.location.href="/";
        })
        .catch ((err) => console.log (err));
    }

    return (
        <Backdrop open={props.open}>
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
                    onClick={() => props.close (false)}
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
                        <Typography variant="h6">Are you sure you want to change this order's status to COMPLETED? After doing so, you won't be able to edit it.</Typography>
                    </Grid>
                    <Grid item xs={1} alignItems='center' justifyContent='center'>
                        <Button variant="contained" onClick={() => updateOrderStatus (props.orderData.id, props.orderData)} sx={{m: 'auto'}}>Yes</Button>
                    </Grid>
                </Grid>
            </Container>
            <PageLoader open={loading} />
        </Backdrop>
    )
}

const OrderStatusSelect = (props) => {
    const [status, setStatus] = React.useState (props.orderData.status);
    const [showStatusModal, setShowStatusModal] = React.useState (false);
    const [loading, setLoading] = React.useState (false);

    function onChangeStatus (event) {
        if (event.target.value === "COMPLETED") {
            setShowStatusModal (true);
        } else {
            setLoading (true);
            updateOrderById (props.orderData.id, {
                orderNumber: props.orderData.orderNumber,
                date: props.orderData.date,
                numberOfProducts: props.orderData.numberOfProducts,
                finalPrice: props.orderData.finalPrice,
                status: event.target.value
            })
            .then ((res) => {
                setLoading (false);
                if (res.status != 200) {
                    setStatus (props.orderData.status);
                }
                window.location.href="/";
            })
            .catch ((err) => console.log (err));
        }
    }
    
    return (
        <React.Fragment>
            <Select
                value={status}
                disabled={status === "COMPLETED"}
                onChange={onChangeStatus}
                sx={{
                    height: '50px',
                    width: '150px'
                }}
            >
                <MenuItem value={"PENDING"}><p style={{color: 'red'}}>PENDING</p></MenuItem>
                <MenuItem value={"IN PROGRESS"}><p style={{color: 'gold'}}>IN PROGRESS</p></MenuItem>
                <MenuItem value={"COMPLETED"}><p style={{color: 'green'}}>COMPLETED</p></MenuItem>
            </Select>
            <OrderStatusConfirmationModal open={showStatusModal} close={setShowStatusModal} orderData={props.orderData} />
            <PageLoader open={loading} />
        </React.Fragment>
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
                        <TableCell><strong>Status</strong></TableCell>
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
                                    <TableCell><OrderStatusSelect orderData={order}/></TableCell>
                                    <TableCell>
                                        <EditButton orderId={order.id} status={order.status} />
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
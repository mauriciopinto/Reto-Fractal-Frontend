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

import { deleteContext } from '../../views/products/MyProducts';

const EditButton = (props) => {
    return (
        <IconButton
            onClick={() => window.location.href = `/add-product/${props.orderId}`}
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
    const deleteProduct = deleteData.deleteProduct;

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
                        <Typography variant="h6">Are you sure you want to delete this product?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={deleteProduct}>Yes</Button>
                    </Grid>
                </Grid>
            </Container>
        </Backdrop>
    )
}

const ProductTable = (props) => {

    return (
        <Grid item container xs={10}>
            <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Product ID</strong></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Unit Price</strong></TableCell>
                        <TableCell><strong>Stock</strong></TableCell>
                        <TableCell><strong>Total Price</strong></TableCell>
                        <TableCell><strong>Options</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.orders.map ((product, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.unitPrice}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>${product.totalPrice}</TableCell>
                                    <TableCell>
                                        <EditButton orderId={product.id}/>
                                        <DeleteButton orderId={product.id}/>
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

export default ProductTable;
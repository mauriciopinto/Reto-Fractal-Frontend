import React from 'react';

import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { orderEditContext } from '../views/EditOrder';

const AddProductModal = (props) => {
    const [selectedValue, setSelectedValue] = React.useState (1);
    const [amount, setAmount] = React.useState (1);
    const [showAmountError, setShowAmountError] = React.useState (false);

    function submitProduct () {
        if (amount < 1) {
            setShowAmountError (true);
        } else {
            setShowAmountError (false);
            const [product] = props.items.filter ((item) => item.id === selectedValue);
            const totalPrice = product.unitPrice * amount;
            props.submit (selectedValue, amount, totalPrice);
        }
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
                    onClick={props.close}
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
                        <Typography variant="h6">Add a product</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <Stack direction="row" spacing={3}>
                                <Select
                                    value={selectedValue}
                                >
                                    {
                                        props.items.map ((product, idx) => {
                                            return (
                                                <MenuItem key={idx} value={product.id} onChange={(e) => setSelectedValue (e.target.value)}>{product.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                <TextField type="number" label="Amount" value={amount} onChange={(e) => setAmount (e.target.value)}/>
                                <Button variant="contained" onClick={submitProduct}>Add</Button>
                            </Stack>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Alert severity='error' sx={{display: showAmountError ? 'block' : 'none'}}>Amount can't be less than 1</Alert>
                    </Grid>
                </Grid>
            </Container>
        </Backdrop>
    )
}

const OrderEditForm = (props) => {
    const [productModalOpen, setProductModalOpen] = React.useState (false);

    const orderData = React.useContext (orderEditContext);
    const [orderNumber, setOrderNumber] = orderData.orderNumber;
    const [orderDate, setOrderDate] = orderData.orderDate;
    const [orderNumberOfProducts, setOrderNumberOfProducts] = orderData.orderNumberOfProducts;
    const [orderFinalPrice, setOrderFinalPrice] = orderData.orderFinalPrice;
    const [allItems, setAllItems] = orderData.allItems;
    const [selectedItems, setSelectedItems] = orderData.selectedItems;

    function closeModal () {
        setProductModalOpen (false);
    }

    function addProduct (productId, amount, totalPrice) {
        setOrderNumberOfProducts (orderNumberOfProducts + amount);
        setOrderFinalPrice (orderFinalPrice + totalPrice);
        setSelectedItems([
            {
                id: productId,
                totalPrice: totalPrice
            },
            ...selectedItems
    ])

        closeModal ();
    }

    return (
        <Box
            sx={{
                height: '60vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">{props.mode === 'create' ? "New Order" : `Order # ${orderNumber}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="number" label="# of Products" value={orderNumberOfProducts} disabled sx={{width: '200px'}}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => setProductModalOpen (true)}>Add Product</Button>
                </Grid>
                <Grid item xs={6}>
                    <TextField type='date' label="date" value={orderDate} disabled sx={{width: '200px'}}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="number" label="finalPrice"  value={orderFinalPrice} disabled sx={{width: '200px'}}/>
                </Grid>
            </Grid>
            <AddProductModal open={productModalOpen} submit={addProduct} close={closeModal} items={allItems}/>
        </Box>
    )
}

export default OrderEditForm;
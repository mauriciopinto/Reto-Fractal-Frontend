import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { productEditContext } from '../../views/products/EditProduct';

const ProductEditForm = (props) => {
    const productData = React.useContext (productEditContext);
    const [productName, setProductName] = productData.name;
    const [productUnitPrice, setProductUnitPrice] = productData.unitPrice;
    const [productStock, setProductStock] = productData.stock;
    const [productTotalPrice, setProductTotalPrice] = productData.totalPrice;

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
                        <Typography variant="h6">{props.mode === 'create' ? "New Product" : `${productName}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="text" label="Name" value={productName} onChange={(e) => setProductName (e.target.value)} sx={{width: '200px'}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type='number' label="Unit Price ($)" value={productUnitPrice} onChange={(e) => setProductUnitPrice (e.target.value)} sx={{width: '200px'}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="number" label="Stock"  value={productStock} onChange={(e) => setProductStock (e.target.value)} sx={{width: '200px'}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type='number' label="Total Price ($)" value={productTotalPrice} onChange={(e) => setProductTotalPrice (e.target.value)} sx={{width: '200px'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={props.submit}>Submit Order</Button>
                    </Grid>
                </Grid>
            </Box>
        
    )
}

export default ProductEditForm;
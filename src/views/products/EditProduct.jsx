import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import ProductEditForm from '../../components/products/ProductEditForm';
import { postProduct } from '../../services/products/postProduct';
import { updateProductById } from '../../services/products/putProduct';

export const productEditContext = React.createContext ();

const EditProductView = (props) => {
    const [productName, setProductName] = React.useState (props.data.name);
    const [productUnitPrice, setProductUnitPrice] = React.useState (props.data.unitPrice);
    const [productStock, setProductStock] = React.useState (props.data.stock);
    const [productTotalPrice, setProductTotalPrice] = React.useState (props.data.totalPrice);

    const [showStockError, setShowStockError] = React.useState (false);

    function sendRequest (params) {
        return props.mode === "create" ? postProduct (params.productData) : updateProductById (params.id, params.productData);
    }

    function submitProduct () {
        if (productStock < 1) {
            setShowStockError (true);
        } else {
            setShowStockError (false);
            
            const productData = {
                name: productName,
                unitPrice: productUnitPrice,
                stock: productStock,
                totalPrice: productTotalPrice
            };

            sendRequest ({id: props.data.id, productData: productData})
            .then ((res) => {
                if (res.status === 200) {
                    alert ('Product saved successfully!');
                    window.location.href = '/my-products'
                }
            })
            .catch ((err) => console.log (err));
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h3'>{props.title}</Typography>
            </Grid>
            <productEditContext.Provider
                value={{
                    name: [productName, setProductName],
                    unitPrice: [productUnitPrice, setProductUnitPrice],
                    stock: [productStock, setProductStock],
                    totalPrice: [productTotalPrice, setProductTotalPrice]
                }}
            >
                <ProductEditForm mode={props.mode} submit={submitProduct} />
            </productEditContext.Provider>
            <Grid item xs={12}>
                <Alert severity='error' sx={{display: showStockError ? 'block' : 'none'}}>Product stock cannot be less than 1</Alert>
            </Grid>
        </Grid>
    )
}

export default EditProductView;
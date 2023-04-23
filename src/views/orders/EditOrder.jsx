import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import OrderEditForm from '../../components/orders/OrderEditForm';

import { updateProductStock } from '../../services/products/putProduct';
import { getAllProducts } from '../../services/products/getProduct';
import { postOrder } from '../../services/orders/postOrder';
import { updateOrderById } from '../../services/orders/putOrder';

export const orderEditContext = React.createContext ();

const EditOrderView = (props) => {
    const [orderNumber, setOrderNumber] = React.useState (props.data.orderNumber);
    const [orderDate, setOrderDate] = React.useState (props.data.date);
    const [orderNumberOfProducts, setOrderNumberOfProducts] = React.useState (props.data.numberOfProducts);
    const [orderFinalPrice, setOrderFinalPrice] = React.useState (props.data.finalPrice);

    const [allItems, setAllItems] = React.useState ([]);
    const [selectedItems, setSelectedItems] = React.useState ([]);

    const [showNumberOfProductsError, setShowNumberOfProductsError] = React.useState (false);

    React.useEffect (() => {
        getAllProducts ()
        .then ((res) => {
            setAllItems (res.data);
        })
        .catch ((err) => console.log (err));
    }, [])

    function sendRequest (params) {
        return props.mode === "create" ? postOrder (params.orderData) : updateOrderById (params.id, params.orderData);
    }

    function submitOrder () {
        if (orderNumberOfProducts < 1) {
            setShowNumberOfProductsError (true);
        } else {
            setShowNumberOfProductsError (false);
            
            const orderData = {
                orderNumber: orderNumber,
                date: props.data.date,
                numberOfProducts: orderNumberOfProducts,
                finalPrice: orderFinalPrice
            };

            sendRequest ({id: props.data.id, orderData: orderData})
            .then ((res) => {
                if (res.status === 200) {
                    selectedItems.forEach ((item) => {
                        updateProductStock (item);
                    });
                    alert ('Order saved successfully!');
                    window.location.href = '/'
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
            <orderEditContext.Provider
                value={{
                    orderNumber: [orderNumber, setOrderNumber],
                    orderDate: [props.data.date, setOrderDate],
                    orderNumberOfProducts: [orderNumberOfProducts, setOrderNumberOfProducts],
                    orderFinalPrice: [orderFinalPrice, setOrderFinalPrice],
                    allItems: [allItems, setAllItems],
                    selectedItems: [selectedItems, setSelectedItems]
                }}
            >
                <OrderEditForm mode={props.mode} submit={submitOrder} />
            </orderEditContext.Provider>
            <Grid item xs={12}>
                <Alert severity='error' sx={{display: showNumberOfProductsError ? 'block' : 'none'}}>Number of products cannot be less than 1</Alert>
            </Grid>
        </Grid>
    )
}

export default EditOrderView;
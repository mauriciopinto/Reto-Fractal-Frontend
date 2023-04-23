import React from "react";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import OrderTable from "../../components/orders/OrderTable";

import { useLoaderData } from "react-router-dom";

import { deleteOrderById } from "../../services/orders/deleteOrder";

export const deleteContext = React.createContext ();

const MyOrdersView = (props) => {
    const loadedData = useLoaderData ();

    const [selectedForDelete, setSelectedForDelete] = React.useState (null);
    const [showDeleteModal, setShowDeleteModal] = React.useState (false);

    function deleteOrder () {
        deleteOrderById (selectedForDelete)
        .then ((res) => {
            if (res.status === 200) {
                alert ('Order deleted successfully!');
                window.location.href = '/';
            }
        })
        .catch ((err) => console.log (err));
        setShowDeleteModal (false);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
            }}
        >
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h3">My Orders</Typography>
                </Grid>

                <deleteContext.Provider
                    value={{
                        selectedForDelete: [selectedForDelete, setSelectedForDelete],
                        showDeleteModal: [showDeleteModal, setShowDeleteModal],
                        deleteOrder: deleteOrder
                    }}
                >
                    <OrderTable orders={loadedData.data} />
                </deleteContext.Provider>
                
                
                <Grid item container xs={10} alignItems="center" justifyContent="right">
                    <Button
                        variant="contained"
                        onClick={() => window.location.href = '/add-order'}
                    >
                        Create Order
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MyOrdersView;
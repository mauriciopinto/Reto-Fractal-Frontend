import React from "react";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import PageLoader from "../PageLoader";
import OrderTable from "../../components/orders/OrderTable";

import { Await, useLoaderData } from "react-router-dom";

import { deleteOrderById } from "../../services/orders/deleteOrder";

export const deleteContext = React.createContext ();

const MyOrdersView = (props) => {
    const loadedData = useLoaderData ();

    const [selectedForDelete, setSelectedForDelete] = React.useState (null);
    const [showDeleteModal, setShowDeleteModal] = React.useState (false);
    const [loading, setLoading] = React.useState (false);

    function deleteOrder () {
        setLoading (true);
        deleteOrderById (selectedForDelete)
        .then ((res) => {
            if (res.status === 200) {
                setLoading (false);
                alert ('Order deleted successfully!');
                window.location.href = '/';
            }
        })
        .catch ((err) => console.log (err));
        setShowDeleteModal (false);
    }

    return (
        <React.Suspense fallback={<PageLoader open={true} />}>
            <Await
                resolve={loadedData.orders}
                errorElement={
                    <p>Error loading orders</p>
                }
            >
                {
                    (orders) => (
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
                                    <OrderTable orders={orders} />
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
            </Await>
            <PageLoader open={loading} />
        </React.Suspense>
    )
}

export default MyOrdersView;
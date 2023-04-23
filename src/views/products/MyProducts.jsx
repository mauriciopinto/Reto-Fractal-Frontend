import React from "react";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ProductTable from "../../components/products/ProductTable";

import { useLoaderData } from "react-router-dom";

import { deleteProductById } from "../../services/products/deleteProduct";

export const deleteContext = React.createContext ();

const MyProductsView = (props) => {
    const loadedData = useLoaderData ();

    const [selectedForDelete, setSelectedForDelete] = React.useState (null);
    const [showDeleteModal, setShowDeleteModal] = React.useState (false);

    function deleteProduct () {
        deleteProductById (selectedForDelete)
        .then ((res) => {
            if (res.status === 200) {
                alert ('Product deleted successfully!');
                window.location.href = '/';
            }
        })
        .catch ((err) => console.log (err));
        setShowDeleteModal (false);
    }

    console.log (loadedData.data)
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h3">My Products</Typography>
                </Grid>

                <deleteContext.Provider
                    value={{
                        selectedForDelete: [selectedForDelete, setSelectedForDelete],
                        showDeleteModal: [showDeleteModal, setShowDeleteModal],
                        deleteProduct: deleteProduct
                    }}
                >
                    <ProductTable orders={loadedData.data} />
                </deleteContext.Provider>
                
                <Grid item container xs={10} alignItems="center" justifyContent="right">
                    <Button
                        variant="contained"
                        onClick={() => window.location.href = '/add-product'}
                    >
                        Create Product
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MyProductsView;
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const MainAppBar = (props) => {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Button  onClick={() => window.location.href='/my-orders'} sx={{color: 'white'}}>My Orders</Button>
                    <Button  onClick={() => window.location.href='/my-products'} sx={{color: 'white'}}>My Products</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default MainAppBar;
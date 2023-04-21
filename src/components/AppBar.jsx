import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const MainAppBar = (props) => {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Button  onClick={() => window.location.href='/'} sx={{color: 'white'}}>My Orders</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default MainAppBar;
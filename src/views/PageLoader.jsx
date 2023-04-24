import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoader = (props) => {
    return (
        <Backdrop 
            open={props.open}
        >
            <CircularProgress />
        </Backdrop>
    )
}

export default PageLoader;
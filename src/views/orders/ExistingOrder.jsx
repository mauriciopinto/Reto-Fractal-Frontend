import React from 'react';

import EditOrderView from './EditOrder';
import { useLoaderData } from 'react-router-dom';

const ExistingOrderView = (props) => {
    const orderData = useLoaderData (). data;

    return (
        <EditOrderView data={orderData} title="Edit an existing Order" mode="edit"/>
    )
}

export default ExistingOrderView;
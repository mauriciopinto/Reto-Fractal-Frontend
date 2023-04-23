import React from 'react';

import EditOrderView from './EditOrder';
import PageLoader from '../PageLoader';

import { useLoaderData, Await } from 'react-router-dom';

const ExistingOrderView = (props) => {
    const orderData = useLoaderData ();

    return (
        <React.Suspense fallback={<PageLoader />}>
            <Await
                resolve={orderData.orderData}
                errorElement={<p>Error loading order</p>}
            >
                {
                    (orderData) => (
                        <EditOrderView data={orderData.data} title="Edit an existing Order" mode="edit"/>
                    )
                }
            </Await>
        </React.Suspense>
        
    )
}

export default ExistingOrderView;
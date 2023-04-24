import React from 'react';

import EditProductView from './EditProduct';
import PageLoader from '../PageLoader';

import { useLoaderData, Await } from 'react-router-dom';

const ExistingProductView = (props) => {
    const productData = useLoaderData ();

    return (
        <React.Suspense fallback={<PageLoader open={true} />}>
            <Await
                resolve={productData.productData}
                errorElement={<p>Error loading product</p>}
            >
                {
                    (productData) => (
                        <EditProductView data={productData.data} title="Edit an existing Product" mode="edit"/>
                    )
                }
            </Await>
        </React.Suspense>
    )
}

export default ExistingProductView;
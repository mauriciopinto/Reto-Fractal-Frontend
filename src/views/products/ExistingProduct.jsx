import React from 'react';

import EditProductView from './EditProduct';
import { useLoaderData } from 'react-router-dom';

const ExistingProductView = (props) => {
    const productData = useLoaderData (). data;

    return (
        <EditProductView data={productData} title="Edit an existing Product" mode="edit"/>
    )
}

export default ExistingProductView;
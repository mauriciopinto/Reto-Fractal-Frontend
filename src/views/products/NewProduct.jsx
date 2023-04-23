import React from 'react';

import EditProductView from './EditProduct';

const NewProductView = (props) => {
    const defaultData = {
        name: '',
        unitPrice: 0.00,
        stock: 0,
        totalPrice: 0.00
    };

    return (
        <EditProductView data={defaultData} title="Create a new Product" mode="create"/>
    )
}

export default NewProductView;
import axios from "axios";

import { getProductById } from "./getProduct";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};

function updateProductById (productId, productData) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders/${productId}`;

    return axios.put (url, productData, config);
}

function updateProductStock (productData) {
    const productId = productData.id;
    const productAmount = productData.amount;
    getProductById (productId)
    .then ((res) => {
        const newProduct = {
            
        };

        updateProductById ();
    })
    .catch ((err) => console.log (err));
}

export {
    updateProductById,
    updateProductStock
};
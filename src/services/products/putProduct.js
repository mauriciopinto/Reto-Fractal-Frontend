import axios from "axios";

import { getProductById } from "./getProduct";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};

function updateProductById (productId, productData) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`;

    return axios.put (url, productData, config);
}

function updateProductStock (productData) {
    const productId = productData.id;
    const productAmount = productData.amount;
    getProductById (productId)
    .then ((res) => {
        const newProduct = {
            name: res.data.name,
            unitPrice: res.data.unitPrice,
            stock: res.data.stock - parseInt (productAmount),
            totalPrice: res.data.totalPrice
        };

        updateProductById (productId, newProduct)
        .then ((res) => console.log (res))
        .catch ((err) => console.log (err));
    })
    .catch ((err) => console.log (err));
}

export {
    updateProductById,
    updateProductStock
};
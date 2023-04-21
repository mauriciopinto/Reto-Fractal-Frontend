import axios from "axios";

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

export {
    updateProductById
};
import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
};

function getAllProducts () {
    const url = `${process.env.REACT_APP_BACKEND_URL}/products`;

    return axios.get (url, config);
}

function getProductById (productId) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`;

    return axios.get (url, config);
}

export {
    getAllProducts,
    getProductById
}
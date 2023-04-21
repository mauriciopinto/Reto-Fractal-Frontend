import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
};

function deleteProductById (productId) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`;

    return axios.delete (url, config);
}

export {
    deleteProductById
};
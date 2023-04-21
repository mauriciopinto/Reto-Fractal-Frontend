import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};

function postProduct (productData) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/products`;

    return axios.post (url, productData, config);
}

export {
    postProduct
}
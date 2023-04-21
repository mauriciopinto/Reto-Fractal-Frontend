import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};

function postOrder (orderData) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders`;

    return axios.post (url, orderData, config);
}

export {
    postOrder
}
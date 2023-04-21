import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
};

function getAllOrders () {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders`;

    return axios.get (url, config);
}

function getOrderById (orderId) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`;

    return axios.get (url, config);
}

export {
    getAllOrders,
    getOrderById
}
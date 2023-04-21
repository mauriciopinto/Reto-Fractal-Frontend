import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};

function updateOrderById (orderId, orderData) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`;

    return axios.put (url, orderData, config);
}

export {
    updateOrderById
};
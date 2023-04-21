import axios from "axios";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
};

function deleteOrderById (orderId) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`;

    return axios.delete (url, config);
}

export {
    deleteOrderById
};
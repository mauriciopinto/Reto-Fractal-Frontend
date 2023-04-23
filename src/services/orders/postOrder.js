import axios from "axios";

import { getAllOrders, getOrderById } from './getOrder'
import { updateOrderById } from "./putOrder";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
};

async function postOrder (orderData) {
    const url = `${process.env.REACT_APP_BACKEND_URL}/orders`;

    const res = await axios.post (url, orderData, config);
    let newProduct = {};
     if (res.status === 200) {
        newProduct = await updateOrderById (res.data.id, {
                orderNumber: res.data.id,
                date: res.data.date,
                numberOfProducts: res.data.numberOfProducts,
                finalPrice: res.data.finalPrice
        })
    }

    return newProduct;
}

export {
    postOrder
}
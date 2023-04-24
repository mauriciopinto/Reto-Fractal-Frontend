import React from 'react';

import EditOrderView from './EditOrder';

import dayjs from 'dayjs';

const NewOrderView = (props) => {
    const defaultData = {
        orderNumber: 1,
        date: dayjs ().format ("YYYY-MM-DD"),
        numberOfProducts: 0,
        finalPrice: 0.0,
        status: 'PENDING'
    };

    return (
        <EditOrderView data={defaultData} title="Create a new Order" mode="create"/>
    )
}

export default NewOrderView;
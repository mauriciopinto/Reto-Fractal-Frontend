import NewOrderView from "./views/NewOrder";
import ExistingOrderView from "./views/ExistingOrder";
import MyOrdersView from "./views/MyOrders";
import  MainAppBar from './components/AppBar';

import { getAllOrders, getOrderById } from "./services/orders/getOrder";
import generatePageTheme from "./styles/theme";
import { ThemeProvider } from "@mui/material";

import {
    Route,
    RouterProvider,
    createRoutesFromElements,
    createBrowserRouter
} from 'react-router-dom';

import Stack from '@mui/material/Stack';


const ViewProvider = (props) => {
    const routeElements = (
        <>
            <Route
                path="/"
                element={<MyOrdersView />}
                loader={getAllOrders}
            />
            <Route
                path="/my-orders"
                element={<MyOrdersView />}
                loader={getAllOrders}
            />
            <Route
                path="/add-order"
                element={<NewOrderView />}
            />
            <Route
                path="/add-order/:id"
                element={<ExistingOrderView />}
                loader={({params}) => getOrderById (params.id)}
            />
        </>
    );

    const routes = createRoutesFromElements (routeElements);
    const router = createBrowserRouter (routes);
    const theme = generatePageTheme ();

    return (
        <ThemeProvider theme={theme}>
            <Stack>
                <MainAppBar />
                <RouterProvider router={router} />
            </Stack>
        </ThemeProvider>
    );
}

export default ViewProvider;
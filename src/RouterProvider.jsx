import NewOrderView from "./views/orders/NewOrder";
import ExistingOrderView from "./views/orders/ExistingOrder";
import MyOrdersView from "./views/orders/MyOrders";
import  MainAppBar from './components/AppBar';

import NewProductView from './views/products/NewProduct';
import ExistingProductView from './views/products/ExistingProduct';
import MyProductsView from "./views/products/MyProducts";

import { getAllProducts, getProductById } from "./services/products/getProduct";
import { getAllOrders, getOrderById } from "./services/orders/getOrder";
import generatePageTheme from "./styles/theme";
import { ThemeProvider } from "@mui/material";

import {
    Route,
    RouterProvider,
    createRoutesFromElements,
    createBrowserRouter, 
    defer
} from 'react-router-dom';

import Stack from '@mui/material/Stack';



const ViewProvider = (props) => {
    const routeElements = (
        <>
            <Route
                path="/"
                element={<MyOrdersView />}
                loader={async () => {
                    const orders = getAllOrders ();
                    return defer ({
                        orders: orders
                    });
                }}
            />
            <Route
                path="/my-orders"
                element={<MyOrdersView />}
                loader={async () => {
                    const orders = getAllOrders ();
                    return defer ({
                        orders: orders
                    });
                }}
            />
            <Route
                path="/add-order"
                element={<NewOrderView />}
            />
            <Route
                path="/add-order/:id"
                element={<ExistingOrderView />}
                loader={async ({params}) => {
                    const order = getOrderById (params.id);
                    return defer ({
                        orderData: order
                    })
                }}
            />
            <Route
                path="/my-products"
                element={<MyProductsView />}
                loader={async () => {
                    const products = getAllProducts ();
                    return defer ({
                        products: products
                    });
                }}
            />
            <Route
                path="/add-product"
                element={<NewProductView />}
            />
            <Route 
                path="/add-product/:id"
                element={<ExistingProductView />}
                loader={async ({params}) => {
                    const product = getProductById (params.id);
                    return defer ({
                        productData: product
                    })
                }}
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
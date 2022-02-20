/**
 * @fileoverview
 * Use <Outlet/> as the parent element for nested routes.
 * This will work only for react-router-dom version 6 or greater.
 */
import { Outlet } from 'react-router-dom';

import NotFound404 from './pages/NotFound404/NotFound404';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import UserDetail from './pages/UserDetail/UserDetail';
import ClientHome from './pages/ClientHome/ClientHome';


const ROUTES = [
    {
        path: "/",
        element: <Outlet/>,
        children: [
            { path: "", element: <Home />},
            { path: "/client", element: <ClientHome />},
            {
                path: "/user",
                element: <Outlet/>,
                children: [
                    { path: "", exact: true, element: <User/>},
                    { path: "detail", exact: true, element: <UserDetail/>},
                ]
            },
            { path: "*", element: <NotFound404/> }
        ]
        
    },

]

export { ROUTES };
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import {useLocalStorage} from 'react-use'

import { Home } from './Home'
import { Login } from './Login'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { Profile } from './Profile'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
]);
export const Router = () => {
    return <RouterProvider router={router} 
/>};

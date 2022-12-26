import Main from "../Layout/Main";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageDoctor from "../Pages/Dashboard/ManageDoctor/ManageDoctor";
import Home from "../Pages/Home/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Pages/Shared/Navbar/Layout/DashboardLayout";
import MyAppointment from "../Pages/Shared/Navbar/Layout/MyAppointment/MyAppointment";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const route = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, children: ([
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/about',
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/reviews',
            },
            {
                path: '/contact',
            },
        ]),
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute> <AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute> <AddDoctor></AddDoctor></AdminRoute>,
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctor></ManageDoctor>  </AdminRoute>,
            },
        ]
    }
])

export default route;
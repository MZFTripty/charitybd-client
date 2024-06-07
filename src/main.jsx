import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './components/Home/Home';
import Root from './components/Root';
import Contact from './components/Pages/Contact';
import About from './components/Pages/About';
import AddFood from './components/AllPrivatePages/Foods/AddFood';
import AuthProvider from './components/Provider/AuthProvider';
import SignUpPage from './components/LogIn/SignUpPage';
import LogInPage from './components/LogIn/LogInPage';
import AvailableFoods from './components/AllPrivatePages/Foods/AvailableFoods';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ManageFoods from './components/AllPrivatePages/Foods/ManageFoods';
import MyFoodRequests from './components/AllPrivatePages/Foods/MyFoodRequests';
import ConfirmedRequest from './components/AllPrivatePages/Foods/ConfirmedRequest';
import AddCloth from './components/AllPrivatePages/Cloths/AddCloth';
import Blogs from './components/Pages/blogs';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/addfood',
        element: <PrivateRoute><AddFood /></PrivateRoute>
      },
      {
        path: '/loginpage',
        element: <LogInPage />
      },
      {
        path: '/signuppage',
        element: <SignUpPage />
      },
      {
        path: '/availablefoods',
        element: <AvailableFoods />,
        loader: ()=> fetch('https://charitybd-server.vercel.app/foodcount')
      },
      {
        path:'/managefoods',
        element: <PrivateRoute><ManageFoods/></PrivateRoute>
      },
      {
        path : '/myfoodrequests',
        element: <PrivateRoute><MyFoodRequests/></PrivateRoute>
      },
      {
        path : '/confirmedrequest',
        element : <PrivateRoute><ConfirmedRequest/></PrivateRoute>
      },
      {
        path : '/addcloth',
        element : <PrivateRoute><AddCloth/></PrivateRoute>
      },
      {
        path : '/blogs',
        element : <PrivateRoute><Blogs/></PrivateRoute>
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';


import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import LoginPage from './pages/LoginPage/login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Pickup from './pages/Pickup/pickup.jsx';
import Price from './pages/Price/price.jsx';

import auth from './utils/auth.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }, {
        path: '/login',
        element: <LoginPage />
      }, 
        {
        path: '/pickup',
        element: <Pickup />
      }, 
      {
        path: '/price',
        element: <Price />
      },
      //  {
      //   path: '/thoughts/:thoughtId',
      //   element: <SingleThought />
      // }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

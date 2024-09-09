import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPanel from './components/pages/AdminPannel';
import Profile from './components/pages/employee_profile';
import Login from './components/pages/loginpage';
import SignupPage from './components/pages/signuppage';
import Welcome from './components/pages/welcome';
import About from './components/pages/aboutus';
import Contact from './components/pages/contactus';
import Home from './App';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));

let allroutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/admin",
    element: <AdminPanel />
  },
  {
    path: "/welcome",
    element: <Welcome />
  },
  {
    path: "/about-us",
    element: <About />
  },
  {
    path: "/contact-us",
    element: <Contact />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={allroutes} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);

reportWebVitals();

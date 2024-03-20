import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FooterText from './pages/FooterText';
import AdminPage from './pages/AdminPage';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import HotelLandingPage from './pages/HotelLandingPage';
import UserBookings from './components/booking/UserBookings';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: (
          <FooterText
            title="About us:"
            text="This Hotel booking app is made by Bart, Tim and Michael as the end project for the Java Developers course."
          />
        ),
      },
      {
        path: '/contact',
        element: (
          <FooterText
            title="Contact"
            text="Currently there is no way of contacting us."
          />
        ),
      },
      {
        path: '/jobs',
        element: (
          <FooterText
            title="Jobs:"
            text="At the moment we do not have any open positions."
          />
        ),
      },
      {
        path: '/terms',
        element: (
          <FooterText
            title="Terms and Conditions:"
            text="
        
        Conditions of use
        By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. [company name] only grants use and access of this website, its products, and its services to those who have accepted its terms.
        Privacy policy
        Before you continue using our website, we advise you to read our privacy policy [link to privacy policy] regarding our user data collection. It will help you better understand our practices.
        Age restriction
        You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. [company name] assumes no responsibility for liabilities related to age misrepresentation.
        Intellectual property
        You agree that all materials, products, and services provided on this website are the property of [company name], its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the [company name]’s intellectual property in any way, including electronic, digital, or new trademark registrations.
        You grant [company name] a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.
        User accounts
        As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
        If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
        We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.
        Applicable law
        By using this website, you agree that the laws of the [your location], without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between [company name] and you, or its business partners and associates.
        Disputes
        Any dispute related in any way to your use of this website or to products you purchase from us shall be arbitrated by state or federal court [your location] and you consent to exclusive jurisdiction and venue of such courts.
        Indemnification
        You agree to indemnify [company name] and its affiliates and hold [company name] harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel. 
        Limitation on liability
        [company name] is not liable for any damages that may occur to you as a result of your misuse of our website.
        [company name] reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between [company name] and the user, and this supersedes and replaces all prior agreements regarding the use of this website.
        "
          />
        ),
      },
      {
        path: '/design',
        element: (
          <FooterText title="Design" text="Design by Bart, Tim and Michael" />
        ),
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/hotel/:id',
        element: <HotelLandingPage />,
      },
      {
        path: '/my-bookings',
        element: <UserBookings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

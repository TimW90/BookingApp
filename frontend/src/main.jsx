import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About.jsx'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {

    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },      
      {
        path: "/about",
        element: <About />
      }
    ]
    
    
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

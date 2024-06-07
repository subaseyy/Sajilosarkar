import './App.css';
import About from './Components/About';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />

      <Footer />

    </>
  );
}

export default App;

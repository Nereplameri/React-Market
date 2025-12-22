import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Authenticate from "./pages/Authenticate";
import ProductList from "./pages/ProductList";
import FreshProductList from "./pages/FreshProductList";
import BrandList from "./pages/BrandList";
function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/productList", element: <ProductList /> },
    { path: "/freshProductList", element: <FreshProductList /> },
    { path: "/BrandList", element: <BrandList /> },
    { path: "/authenticate", element: <Authenticate /> },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;

import Home from './pages/Home/Home';
import SearchProducts from './pages/SearchProducts/SearchProducts';
import Product from './pages/Product/Product';

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/items",
    component: SearchProducts,
    exact: true
  },
  {
    path: "/items/:id",
    component: Product,
    exact: true
  }
];

export default routes;

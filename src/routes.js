import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard"));

const AddProduct = React.lazy(() => import("./views/Pages/Product/AddProduct"));
const ListProduct = React.lazy(() =>
  import("./views/Pages/Product/ListProduct")
);
const UpdateProduct = React.lazy(() =>
  import("./views/Pages/Product/UpdateProduct")
);
const Logout = React.lazy(() => import("./views/Pages/Logout"));

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/add", name: "Add Product", component: AddProduct },
  { path: "/products", name: "Products List", component: ListProduct },
  { path: "/edit/:id", name: "Update Product", component: UpdateProduct },
  { path: "/logout", name: "Logout", component: Logout },
];

export default routes;

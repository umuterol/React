import { Route, Redirect } from "react-router-dom";

import Welcome from "./screens/Welcome";
import Products from "./screens/Products";
import ProductDetail from "./screens/ProductDetail";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Route path="/" exact>
          <Redirect to="/welcome"></Redirect>
        </Route>
        <Route path="/welcome">
          <Welcome></Welcome>
        </Route>
        <Route path="/products" exact>
          <Products></Products>
        </Route>
        <Route path={"/products/:productId"}>
          <ProductDetail></ProductDetail>
        </Route>
      </main>
    </div>
  );
}

export default App;

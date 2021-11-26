import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NavBar from "./components/Navbar/NavBar";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/:id" exact component={Products} />
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

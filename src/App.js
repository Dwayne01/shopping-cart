import React, { Component } from 'react';
import Login from './components/Login';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { Switch,  BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';
import { StoreContextProvider } from './context/StoreContext';


const App = () =>  {

  const logOut = () => {
    localStorage.removeItem('x-access-token');
  }

    const auth = isAuthenticated();
  return (
      <StoreContextProvider>
       <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
                <Link className="navbar-brand" to="/">ShoppingCart</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Products</Link>
                    <Link className="nav-item nav-link" to="/cart">Cart</Link>
                    { (auth) ? <Link className="nav-item nav-link" to="/checkout">Checkout</Link>: ''}
                    {
                      ( auth ) ?
                        ( <a className="nav-item nav-link" href="/" onClick={logOut}>Log out</a>) :
                        ( <Link className="nav-item nav-link float-right" to="/login">Log in</Link> )
                    }
                  </div>
                </div>
              </div>
            </nav>

            <Switch>
              <div className="container">
            
              <Route exact path="/" component={Products} />
                <Route exact path="/cart" component={Cart} />
                  <Route exact path="/checkout" component={Checkout} />
                { (!auth) ? <Route exact path="/login" component={Login} /> : '' }
                </div>
            </Switch>
        </div>
      </Router>
      </StoreContextProvider>
      );

}

export default App;

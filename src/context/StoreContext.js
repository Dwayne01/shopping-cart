import React, { useState } from 'react';

const StoreContext = React.createContext({
    products: [],
    cart: {},
});

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const setUserToContext = (data) => {
    setUser(data);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        setProducts,
        setCart,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };

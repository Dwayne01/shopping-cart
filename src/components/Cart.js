import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createCartProducts, getCartProducts } from '../repository';
import CartItem from './CartItem';

const Cart = () => {
	
	const [total, setTotal] = React.useState(0);
	const [products, setProducts] = React.useState([]);


	useEffect(() => {
		getCartProducts().then(cart => {

			let totalNew = 0
			if (cart.length === 0) return;
			for (var i = 0; i < cart.length; i++) {
				if (cart[i]) {
					totalNew = total + (cart[i].price || 1) * (cart[i].qty || 1);
				}
			
			}
			setTotal(totalNew);
			setProducts(cart.filter(product => {if (product) return product}));
		});
	}, []);
	
			console.log(products);
	

	const removeFromCart = (item) => {
		let products = products.filter((data) => data.id !== item.id);
		
		delete products[item.id.toString()];
		setCart(products);
		total = total - (item.qty * item.price) 
		setTotal(total);
		setProducts(products);
		createCartProducts({products, username: 'user'})
	}

	const clearCart = () => {
		setTotal(0);
		setCart([]);
	}

	return (
		<div className=" container">
			<h3 className="card-title">Cart</h3>
			<hr/>
			{
				products.length > 0 && products.map((product, index) => <CartItem product={product} remove={removeFromCart} key={index}/>)
			}
			<hr/>
			{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>: ''}

			{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
			<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
			<button className="btn btn-danger float-right" onClick={clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
			<br/><br/><br/>
		</div>
	);
	
}

export default Cart;

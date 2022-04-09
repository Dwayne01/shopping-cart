import React, { useEffect, useState , useContext} from 'react';
import { isAuthenticated, getCartProducts } from '../repository';
import {  Redirect, Link } from 'react-router-dom';

const Checkout = () => {
	const [total, setTotal] = useState(0);
	const [products, setProducts] = useState([]);

	
	if (!isAuthenticated()) return (<Redirect to="/login" />);

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
	

	const createOrder = () => {
		  alert('Your purchase')
	 }


	
		return (
			<div className=" container">
				<h3 className="card-title">Checkout</h3>
				<hr/>
				{
					products.map((product, index) => 
						<div key={index}>
							<p>
								{product.title} 
								<small> (quantity: {product.qty})</small>
								<span className="float-right text-primary">${product.qty * product.price}</span>
							</p><hr/>
						</div>
					)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>: ''}
				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				{ products.length ? <button className="btn btn-success float-right" onClick={createOrder}>Pay</button>: '' }
				<Link to="/"><button className="btn btn-danger float-right" style={{ marginRight: "10px" }}>Cancel</button></Link>
				<br/><br/><br/>
			</div>
		);
	
}

export default Checkout;
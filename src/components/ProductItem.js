import React, { useContext, useState } from 'react';
import {StoreContext} from '../context/StoreContext';
import { createCartProducts } from '../repository';
const ProductItem = ({product}) => {
	const [quantity, setQuantity] = useState({quantity: 1});
	const {
		setCart,
		cart,
	} = useContext(StoreContext);

	const handleInputChange = event => setQuantity({[event.target.name]: event.target.value})

	const addToCart = () => {

		
		let id = product.id;
		cart[id] = cart[id] || product;
		cart[id].qty = 	cart[id].qty || 0;

		let qty = cart[id].qty + parseInt(quantity.quantity);
		if (product.available_quantity < qty) {
			cart[id].qty = product.available_quantity; 
		} else {
			cart[id].qty = qty
		}
		

		createCartProducts(cart)
		setCart(cart);
	} 

		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
				<div className="card-body">
					<img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} />
			    <h4 className="card-title">{product.title}</h4>
			    <p className="card-text">{product.description}</p>
			    <h5 className="card-text"><small>price: </small>${product.price}</h5>
			    <span className="card-text"><small>Available Quantity: </small>{product.available_quantity}</span>
			    
			    { product.available_quantity > 0 ?
			    	<div>
			    		<button className="btn btn-sm btn-warning float-right" onClick={addToCart}>Add to cart</button>
			    		<input type="number" value={quantity.quantity} name="quantity" onChange={handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
			    	</div> : 
			    	<p className="text-danger"> product is out of stock </p>
			 	}

			  </div>
			</div>
		)
	
}


export default ProductItem;
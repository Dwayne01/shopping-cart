import React from 'react';

 const CartItem = (props) => {
const { product, remove } = props;
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
				<div className="card-body">
					
			    <h4 className="card-title">{product.title}</h4>
			    <h5 className="card-text"><small>price: </small>${product.price}</h5>
			    <span className="card-text text-success"><small>Quantity: </small>{product.qty}</span>
			    
			    <button className="btn btn-sm btn-warning float-right" onClick={() => remove(product)}>Remove from cart</button>

			  </div>
			</div>
		)	
}


export default CartItem;
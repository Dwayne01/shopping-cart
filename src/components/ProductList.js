import React, { useEffect } from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const  ProductList = () => {
	const [products, setProducts] = React.useState([]);
	
	function generateRandomInteger() {
		return Math.floor(Math.random() * 20) + 1;
	}

	useEffect(() => {
		fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => { 
			setProducts(data.map(data => ({ ...data, available_quantity: generateRandomInteger() })));
		})
	}, [])

		return (
			<div className=" container">
				<h3 className="card-title">List of Available Products</h3>
				<hr/>
				{
					products.map((product, index) => <ProductItem product={product} key={index}/>)
				}
				<hr/>
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<Link to="/cart"><button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>View Cart</button></Link>
				<br/><br/><br/>
			</div>
		);
	
}


export default ProductList;
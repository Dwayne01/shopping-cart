import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export function getCartProducts() {
	return axios.get(`${BASE_URL}/api/cart`)
		.then(response => response.data.data);
}

export function createCartProducts(cart) {
	const response =  axios.post(`${BASE_URL}/api/cart`, cart ).then(response => {
		
			return response.data
		})
;
}

export function login (data) {
	return axios.post(`${BASE_URL}/api/auth`, { name: data.name, password: data.password })
		.then(response => {
			localStorage.setItem('x-access-token', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
			return response.data
		})
		.catch(err => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated(){
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}

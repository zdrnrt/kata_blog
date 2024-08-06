import React, { useEffect } from 'react';

export function getArticleList(request) {
	console.log('getArticleList');
	return fetch('https://blog.kata.academy/api/articles/?' + request)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function getArticle(slug) {
	console.log('getArticleSingle');
	return fetch('https://blog.kata.academy/api/articles/' + slug)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function postArticle(request) {
	console.log('postArticle');
	const options = {
		method: 'POST',
		Authorization: request.api_key,
		body: request.body
	};
	return fetch('https://blog.kata.academy/api/articles/', options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function putArticle() {
	console.log('putArticle');
	const options = {
		method: 'PUT',
	};
	return fetch('https://blog.kata.academy/api/articles/' + slug, options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function deleteArticle(slug) {
	console.log('deleteArticle');
	///api/articles/{slug} \
	const options = {
		method: 'DELETE',
	};
	return fetch('https://blog.kata.academy/api/articles/' + slug, options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});

}

export function postRateArticle() {
	console.log('postRateArticle');
};

export function loginUser(user) {
	console.log('loginUser');
	const options = {
		method: 'POST',
		body: user
	};
	return fetch('https://blog.kata.academy/api/users/login', options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}
export function registerUser() {
	console.log('registerUser');
	const options = {
		method: 'POST',
		body: user
	};
	return fetch('https://blog.kata.academy/api/users', options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}
export function updateUser() {
	console.log('registerUser');
	const options = {
		method: 'PUT',
		body: user
	};
	return fetch('https://blog.kata.academy/api/user', options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

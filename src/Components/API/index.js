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

export function postArticle() {
	console.log('postArticle');
}

export function putArticle() {
	console.log('putArticle');
}

export function deleteArticle() {
	console.log('deleteArticle');
}

export function postRateArticle() {
	console.log('postRateArticle');
}

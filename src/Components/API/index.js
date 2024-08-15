const API_BASE = 'https://blog.kata.academy/api/';

export function getArticleList(request) {
	let url = new URL(API_BASE + 'articles/');
	for (let elem in request) {
		url.searchParams.set(elem, request[elem]);
	}
	return fetch(url.href)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function getArticle(slug) {
	console.log('getArticleSingle');
	return fetch(API_BASE + 'articles/' + slug)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function postArticle({ data, token }) {
	console.log('postArticle', data);
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': JSON.stringify(data).length.toString(),
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ article: data }),
	};
	return fetch(API_BASE + 'articles/', options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function putArticle({ slug, data, token }) {
	console.log('putArticle', slug, data, token);
	const options = {
		method: 'PUT',
		headers: {
			// 'Content-Type': 'application/json',
			// 'Content-Length': JSON.stringify(data).length.toString(),
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ article: data }),
	};
	// token && (options['headers']['Authorization'] = `Bearer ${token}`);

	fetch(API_BASE + 'articles/' + slug, options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

export function deleteArticle({ slug, token }) {
	console.log('deleteArticle');
	///api/articles/{slug} \
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return fetch(API_BASE + 'articles/' + slug, options)
		.then((response) => {
			if (status.ok) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.catch((error) => ({ error }));
}

export function postRateArticle() {
	console.log('postRateArticle');
}

export function loginUser(user) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': JSON.stringify(user).length.toString(),
		},
		body: JSON.stringify({ ...user }),
	};
	console.log('loginUser', options);
	return fetch(API_BASE + 'users/login', options)
		.then((response) => response.json())
		.catch((error) => ({ error: error }));
}
export function registerUser(user) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': JSON.stringify(user).length.toString(),
		},
		body: JSON.stringify({ ...user }),
	};
	console.log('registerUser', options);
	return fetch(API_BASE + 'users', options).then((response) => response.json());
	// .catch((error) => ({ error: error }));
}
export function updateUser(user, token) {
	console.log('registerUser', user, token);
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': JSON.stringify(user).length.toString(),
		},
		body: JSON.stringify({ ...user }),
	};
	token && (options['headers']['Authorization'] = `Bearer ${token}`);
	return fetch(API_BASE + 'user', options)
		.then((response) => response.json())
		.catch((error) => {
			error: error;
		});
}

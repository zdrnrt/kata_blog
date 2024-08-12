import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, useParams, Switch } from 'react-router-dom';

import Context from '../Context/Context';
import Content from '../Content';
import SignIn from '../Sign/In/SignIn';
import SignUp from '../Sign/Up/SignUp';
import Article from '../Article';
import * as API from '../API';
import FormArticle from '../FormArticle';

function Routing({ props }) {
	// let {params} = useParams();
	const { user } = useContext(Context);
	console.log('Routing user', user);
	let { match, location, history, request } = props;

	let [articleRequest, changeArticleRequest] = useState(request);
	let [articleListData, changeArticleList] = useState(null);
	let [articleData, changeArticle] = useState(null);

	if (match.params.slug && match.params.slug != 'number') {
		let slug = match.params.slug;

		let article = null;

		if (articleData?.slug != slug) {
			article = articleListData?.articles.find((el) => el.slug == slug) || null;
			if (!article) {
				API.getArticle(slug)
					.then((response) => {
						changeArticle(response.article);
					})
					.catch((error) => {
						console.log('catch error', error);
					});
			} else {
				changeArticle(article);
			}
		}
	} else {
		// проверка на выход из диапазона
		if (match.params.number) {
			if (articleRequest.limit * match.params.number != articleRequest.offset) {
				changeArticleRequest((data) => {
					return {
						...data,
						offset: data.limit * match.params.number,
					};
				});
			}
		} else if (articleRequest.offset != 0) {
			changeArticleRequest((data) => {
				return {
					...data,
					offset: 0,
				};
			});
		}
	}

	useEffect(() => {
		API.getArticleList(articleRequest)
			.then((response) => {
				changeArticleList(response);
			})
			.catch((error) => {
				console.log('catch error', error);
			});
	}, [articleRequest]);

	return (
		<Switch>
			<Route
				path="/articles/:slug"
				exact={true}
				render={({ match, location, history }) => (
					<Content
						props={{
							articleListData: { articles: articleData ? [articleData] : null },
							single: true,
						}}
					/>
				)}
			></Route>
			<Route path={['/', '/articles/', '/articles/number/:number']} exact={true}>
				<Content
					props={{
						articleListData,
						articleRequest,
						changeArticleRequest,
						single: false,
					}}
				/>
			</Route>
			<Route
				path="/article/:slug/edit"
				exact={true}
				render={({ match, location, history }) => (
					<FormArticle
						props={{
							articleListData,
							articleRequest,
							match,
							location,
							history,
							edit: true,
						}}
					/>
				)}
			></Route>
			<Route path="/sign-in" exact={true} render={(user) => <SignIn props={{ user: !!user }} />}></Route>
			<Route path="/sign-up" exact={true} render={({ match }) => <SignUp props={{ match }} />}></Route>
			<Route path="/profile" exact={true} render={({ profile }) => <SignUp props={{ profile }} />}></Route>
		</Switch>
	);
}

export default Routing;

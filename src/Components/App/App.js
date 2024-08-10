import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import Routing from '../Routing';

import Header from '../Header/Header';
import Provider from '../Context/Provider';
import SignIn from '../Sign/In/SignIn';
import SignUp from '../Sign/Up/SignUp';
import FormArticle from '../FormArticle';

function App() {
	// let [articleRequest, changeArticleRequest] = useState({
	// 	offset: 0,
	// 	limit: 20,
	// });

	// let [articleListData, changeArticleList] = useState(null);
	// let requestString = [];
	// for (let param in articleRequest) {
	// 	requestString.push(`${param}=${articleRequest[param]}`);
	// }

	// useEffect(() => {
	// 	changeArticleList(null);
	// 	// console.log(requestString.join('&'));
	// 	API.getArticleList(requestString.join('&')).then((response) => {
	// 		//   console.log(response, !response.error);
	// 		if (!response.error) {
	// 			changeArticleList(response);
	// 		} else {
	// 			console.log('API.getArticleList', error);
	// 		}
	// 	});
	// }, [articleRequest]);
	const request = {
		offset: 0,
		limit: 20,
	}
	console.log('App')
	return (
		<Provider>
			<Router>
				<div className="app">
					<Header />
					<main className="app__main">
						<div className="container">
							<div className="col-md-9 m-auto pt-5 pb-5">
								{/* <Route
									path={["/articles/:slug"]}
									exact={true}
									render={({ match, location, history }) => (
										<Routing
											props={{
												match,
												location,
												history,
												single: true,
											}}
										/>
									)}
								></Route> */}
								<Route
									path={["/new-article", ]}
									exact={true}
									render={({ match, location, history }) => (
										<FormArticle
											props={{
												match,
												location,
												history,
											}}
										/>
									)}
								></Route>
								<Route
									path={['/', '/articles/', '/articles/number/:number', '/articles/:slug', '/articles/:slug/edit']}
									exact={true}
									render={({ match, location, history }) => (
										<Routing
											props={{
												request,
												match,
												location,
												history
											}}
										/>
									)}
								></Route>
								<Route path="/sign-in" exact={true}>
									<SignIn />
								</Route>
								<Route
									path="/sign-up"
									exact={true}
									render={({ match }) => <SignUp props={{ match }} />}
								></Route>
								<Route
									path="/profile"
									exact={true}
									render={({ match }) => <SignUp props={{ match }} />}
								></Route>
								
							</div>
						</div>
					</main>
				</div>
			</Router>
		</Provider>
	);
}

export default App;

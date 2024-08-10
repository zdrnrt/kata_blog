import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useParams, Switch } from 'react-router-dom';

import Content from '../Content';
import SignIn from '../Sign/In/SignIn';
import SignUp from '../Sign/Up/SignUp';
import Article from '../Article';
import * as API from '../API';
import FormArticle from '../FormArticle';

function Routing({props}){
    // let {params} = useParams();
    let { match, location, history, request } = props;
    console.log('Routing', match, location, history );

    let [articleRequest, changeArticleRequest] = useState(request);
	let [articleListData, changeArticleList] = useState(null);
	let [articleData, changeArticle] = useState(null);
	let requestString = [];

	for (let param in articleRequest) {
		requestString.push(`${param}=${articleRequest[param]}`);
	}
    console.log('articleData', articleData);
    if (match.params.slug && match.params.slug != 'number') {
        console.log('slug', match.params.slug);
        let article = articleData?.slug == match.params.slug ? articleData : null;
		if (!article) {
			API.getArticle(match.params.slug).then((response) => {
				if (!response.error) {
                    changeArticle ( response.article );
                    // articleList = [response.article];
				}
			});
		}

    } else if (match.params.number){
        console.log('number', match.params.number);
        if ( (articleRequest.limit * match.params.number) != articleRequest.offset) {
			console.log((articleRequest.limit * match.params.number) != articleRequest.offset);
			// 
			changeArticleRequest( (data) => {
				return ({
					...data,
					offset: data.limit * match.params.number
				})
			})
		}
		let requestString = [];
		for (let param in articleRequest) {
			requestString.push(`${param}=${articleRequest[param]}`);
		}
        useEffect(() => {
        	// changeArticleList(null);
        	// console.log(requestString.join('&'));
        	API.getArticleList(requestString.join('&')).then((response) => {
        		//   console.log(response, !response.error);
        		if (!response.error) {
        			changeArticleList(response);
        		} else {
        			console.log('API.getArticleList', error);
        		}
        	});
        }, [articleRequest]);
    } 
	/*else {
        console.log('/', match.params.slug, match.params.number);
		
		// changeArticleRequest( (data) request);

		useEffect(() => {
        	// console.log(requestString.join('&'));
        	API.getArticleList(requestString.join('&')).then((response) => {
        		//   console.log(response, !response.error);
        		if (!response.error) {
        			changeArticleList(response);
        		} else {
        			console.log('API.getArticleList', error);
        		}
        	});
        }, [articleRequest]);
    }*/

	return (
        <Switch>
            <Route
                path="/articles/:slug"
                exact={true}
                render={({ match, location, history }) => (
                    <Content
                        props={{
                            articleListData: { articles: articleData ? [articleData] : null},
                            single: true
                        }}
                    />
                )}
            ></Route>
            <Route
                path={['/', '/articles/', '/articles/number/:number']}
                exact={true}
                render={({ match, location, history }) => (
                    <Content
                        props={{
                            articleListData,
							articleRequest,
                            changeArticleRequest,
                            single: false
                        }}
                    />
                )}
            ></Route>
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
        </Switch>
	);
};

export default Routing;